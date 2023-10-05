import { Avatar, Card, Link } from "@nextui-org/react";

export default function UserPainel(props: any) {

    return (
        <Card className="flex gap-4 items-center pt-10">
            <Avatar src="https://i.pravatar.cc/150?u=a04258114e29026708c" className="w-20 h-20 text-large" />
            {props.username}
            <Link href="http://localhost:3000/api/logout">
                Logout
            </Link>
        </Card>
    )
}