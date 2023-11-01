/* eslint-disable react/jsx-key */
import { Button, Card, CardHeader, ScrollShadow } from "@nextui-org/react";
import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from "next-i18next";
import moment from "moment"



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

const apiLink = process.env.BACKEND_API

export default function ReportsPainel(props: any) {

    const { t } = useTranslation('common')
    const [data, setRegistros] = useState([] as any[])

    async function carregaRelatorio() {
        const res = await fetch(apiLink + '/api/getRegistersByDate', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username: props.username, year: startDate.getFullYear() }),
            credentials: 'include'
        })

        const registros = await res.json()
        setRegistros(registros.data)
    }

    const [startDate, setStartDate] = useState(new Date());

    return (
        <Card className="p-10">
            <div>
                <DatePicker className="p-1"
                    selected={startDate}
                    onChange={(date) => setStartDate(date as any)}
                    showYearPicker
                    dateFormat="yyyy"
                />
                <Button className="flex-auto" onPress={carregaRelatorio}>Carregar Relatório</Button>
            </div>
            {data[0] &&
                <div className="flex-auto h-32">
                    <div className=" grid-cols-3 p-10 overflow-y-scroll h-full">
                        {
                            Object.keys(dateObj).map((key: any) => {
                                return data[key].length > 0 &&
                                    <Card className="">   <CardHeader className="gap-3">{t(dateObj[key as keyof Object])}</CardHeader>
                                        {Object.keys(data[key]).map((key2: any) => {
                                            return (<div className="pt-2">
                                                {Object.keys(data[key][key2]).map((key3: any) => {
                                                    return (<div >
                                                        {key3 == 'name' ?
                                                            <div>Nome: {data[key][key2][key3]}</div>
                                                            : key3 == 'value' ?
                                                                <div >Valor: {Number(data[key][key2][key3]).toLocaleString('pt-br', { style: "currency", currency: "BRL" })}</div>
                                                                :
                                                                key3 == 'createdAt' ?
                                                                    <div>Adicionado: {moment(new Date(data[key][key2][key3]).toISOString().split('T'), "YYYY/MM/DD").format("DD/MM/YYYY")}</div>
                                                                    : key3 == 'type' ?
                                                                        <div>Tipo: {data[key][key2][key3]}</div>
                                                                        : ''
                                                        }
                                                    </div>)
                                                })}</div>)
                                        })}
                                    </Card>
                            })
                        }
                    </div>
                </div>

            }

        </Card>


    );


}