import { useEffect, useState } from "react";
import { FilesMenu } from "../../components/files/files-menu"
import { HeroBlock } from "../../components/hero-block/HeroBlock";
import { useAuth } from "../../contexts/auth-context"
import { SearchResults } from "../search-results/search-results";

interface HomePageProps {
    searchResults: string[];
    setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
}

export const HomePage = ({ searchResults, setSearchResults }: HomePageProps) => {
    const { isAuthenticated } = useAuth();
    const [homeBody, setHomeBody] = useState(<FilesMenu />);

    useEffect(() => {
        if (searchResults.length) {
            setHomeBody(<SearchResults searchResults={searchResults} setSearchResults={setSearchResults}/>)
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