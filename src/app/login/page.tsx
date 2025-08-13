import LoginPage from "@/components/LoginPage"
import ToggleSwitcher from "@/components/ToggleSwitcher"
import TopComponent from "@/components/TopComponent"

const Login = () => {

    return (
        <div className="bg-[var(--color-secondary)] p-6 w-full">
            <ToggleSwitcher />
            <LoginPage />
        </div>
    )
}

export default Login