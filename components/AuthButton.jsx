"use client"

import { LogIn, LogOut } from "lucide-react"
import { Button } from "./ui/button"
import { useState } from "react";
import { AuthModal } from "./AuthModal";
import { signOut } from "@/app/actions";

const AuthButton = ({ user }) => {
    const [showAuthModal, setShowAuthModal] = useState(false);

    if (user) {
        return (
            <form action={signOut}>
                <Button variant="ghost" size="sm" type="submit" className="gap-2 cursor-pointer">
                    <LogOut className="w-4 h-4" />
                    Sair
                </Button>
            </form>
        );
    }

    return (
        <div>
            <Button
                onClick={() => setShowAuthModal(true)}
                variant="default"
                size="sm"
                className={"bg-orange-500 hover:bg-orange-600 gap-2 cursor-pointer"}
            >
                <LogIn className="w-4 h-4" />
                Entrar
            </Button>

            <AuthModal isOpen={showAuthModal} onClose={setShowAuthModal} />
        </div>
    )
}

export default AuthButton
