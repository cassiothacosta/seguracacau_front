import { Avatar, Card, Link } from "@nextui-org/react";
import { useTranslation } from "next-i18next";

export default function UserPainel(props: any) {
    const { t } = useTranslation('common')
    return (
        <Card className="flex gap-4 items-start p-10">
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
            {props.username}
            <Link href="http:///api/logout">
                {t('logout')}
            </Link>
        </Card>
    )
}