import { FilesMenu } from "../../components/files/files-menu"
import { HeroBlock } from "../../components/hero-block/HeroBlock";
import { useAuth } from "../../contexts/auth-context"

export const HomePage = () => {
    const { isAuthenticated } = useAuth();

    return (
        isAuthenticated ? (
           <FilesMenu />
        ) : (
            <HeroBlock />
        ))
}