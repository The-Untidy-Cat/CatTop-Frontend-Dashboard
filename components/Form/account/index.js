import { useUser } from "@components/Provider/AuthProvider";
import { useEffect, useState } from "react";

export function UpdateProfieForm({onSuccess, onClose}){
    const { user } = useUser();
    const [loading, setLoading] = useState(false);
    useEffect(() => {

    }, [user]);
}