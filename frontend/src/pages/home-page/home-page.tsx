import { useEffect, useState } from "react";
import { FilesMenu } from "../../components/files/files-menu"
import { HeroBlock } from "../../components/hero-block/HeroBlock";
import { useAuth } from "../../contexts/auth-context"
import { SearchResults } from "../search-results/search-results";

interface HomePageProps {
    searchResults: string[];
}

export const HomePage = ({ searchResults }: HomePageProps) => {
    const { isAuthenticated } = useAuth();
    const [homeBody, setHomeBody] = useState(<FilesMenu />);

    useEffect(() => {
        if (searchResults.length) {
            setHomeBody(<SearchResults searchResults={searchResults}/>)
        } else {
            setHomeBody(<FilesMenu />)
        }
    }, [searchResults]);

    return (
        isAuthenticated ? (
            <>
                {homeBody}
            </>
        ) : (
            <HeroBlock />
    ))
}