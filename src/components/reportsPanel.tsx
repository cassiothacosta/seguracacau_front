/* eslint-disable react/jsx-key */
import { Button, Card, CardHeader, Divider, ScrollShadow, Spacer } from "@nextui-org/react";
import { useEffect, useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "next-i18next";
import moment from "moment"
import generatePDF, { Options } from "react-to-pdf";

const options: Options = {
    filename: "using-function.pdf",
    page: {
        margin: 20
    }
};



const dateObj = {
    0: 'jan',
    1: 'feb',
    2: 'mar',
    3: 'apr',
    4: 'may',
    5: 'jun',
    6: 'jul',
    7: 'aug',
    8: 'sep',
    9: 'oct',
    10: 'nov',
    11: 'dec'
}

const getTargetElement = () => document.getElementById("pdf-container");

const downloadPdf = () => {
    const target: any = document.getElementById("pdf-container")

    target.className = 'light bg-background flex-auto rounded-lg'
    generatePDF(getTargetElement, options)
    target.className = 'light bg-background flex-auto h-32 rounded-lg'
}

const apiLink = process.env.BACKEND_API

export default function ReportsPanel({ user, handlePageTitle }: any) {

    const { t } = useTranslation('common')
    const [data, setRegistros] = useState([] as any[])
    let yearTotal = 0


    useEffect(() => {
        handlePageTitle(t('reportsPage'))
    })

    async function carregaRelatorio() {
        const res = await fetch(apiLink + '/api/getRegistersByDate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: user.username, year: startDate.getFullYear() }),
            credentials: 'include'
        })

        const registros = await res.json()
        setRegistros(registros.data)
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <Card className="p-10 flex flex-col gap-4">
            <div className="pb-10 flex justify-between gap-3 items-end">
                <div>{t('selectYear')}<Spacer />
                    <DatePicker className="p-1 rounded-lg"
                        selected={startDate}
                        onChange={(date) => setStartDate(date as any)}
                        showYearPicker
                        dateFormat="yyyy"
                    />
                </div>
                <div className="grid grid-cols-2 gap-5">
                    <Button className="" onPress={carregaRelatorio}>{t('loadReport')}</Button>
                    <Button className="" onClick={downloadPdf}>Download PDF</Button>
                </div>
            </div>
            {data.toString().includes('object') &&
                <div id="pdf-container" className="light bg-background flex-auto h-32 rounded-lg">
                    <div className="p-10 overflow-y-scroll h-full ">
                        <div className="text-black text-center text-2xl font-semibold">{t('registerReport') + ' - ' + moment(new Date(startDate).toISOString().split('T'), "YYYY/MM/DD").format("YYYY")}</div>
                        {
                            Object.keys(dateObj).map((key: any) => {
                                let monthTotal = 0
                                return data[key] && data[key].length > 0 &&
                                    <li key={key} className="list-none"><div className="text-black gap-3 text-center pt-10 pb-10 text-xl font-semibold">{t((dateObj as any)[key])}</div>
                                        {Object.keys(data[key]).map((key2) => {
                                            return (<ul key={key2} className="text-black col-span pt-2">
                                                {Object.keys(data[key][key2]).map((key3) => {
                                                    return (<ul key={key3}>
                                                        {key3 == 'name' ?
                                                            <div className="text-black pl-4">{t('name') + ': ' + data[key][key2][key3]}</div>
                                                            : key3 == 'value' ?
                                                                <div id="value" className="text-black grid place-items-end pr-4 ">{Number(data[key][key2][key3]).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</div>
                                                                :
                                                                key3 == 'createdAt' ?
                                                                    <div className="text-black grid place-items-end pr-4">{t('added') + ': ' + moment(new Date(data[key][key2][key3]).toISOString().split('T'), "YYYY/MM/DD").format("DD/MM/YYYY")}</div>
                                                                    : key3 == 'type' ?
                                                                        <div>
                                                                            <div className="text-black pl-4">{t('type') + ': ' + data[key][key2][key3]}</div>
                                                                            <div hidden>{monthTotal += data[key][key2][key3] == 'despesa' ? -Number(data[key][key2]['value']) : Number(data[key][key2]['value'])}</div>
                                                                        </div>
                                                                        : ''
                                                        }
                                                    </ul>)
                                                })}<Divider className="my-4" /></ul>)
                                        })}
                                        <div className="text-black grid place-items-end pr-4 font-semibold">{t('totalMonth') + Number(monthTotal).toLocaleString('pt-br', { style: "currency", currency: "BRL" })} </div>
                                        <div hidden>{yearTotal += monthTotal}</div>
                                    </li>

                            })
                        }
                        <Spacer className="h-2" />
                        <div className="text-black grid place-items-end pr-4 font-semibold">{t('totalYear') + Number(yearTotal).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</div>
                    </div>
                </div>
            }

        </Card>


    );


}