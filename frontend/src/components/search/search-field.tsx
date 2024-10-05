import { alpha, InputBase, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { ChangeEvent } from "react";
import axios from "axios";

const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('xs')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
    flexGrow: 1
}));

const SearchIconWrapper = styled('div')(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: '100%',
  position: 'absolute',
  pointerEvents: 'none',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  '& .MuiInputBase-input': {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)})`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },
}));

const apiUrl = import.meta.env.VITE_API_URL;

interface SearchFieldProps {
  setSearchResults: React.Dispatch<React.SetStateAction<string[]>>;
}

export const SearchField = ({ setSearchResults }: SearchFieldProps) => {
  const handleSearch = async (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const query = e.target.value;

    if (query === '') {
      setSearchResults([]);
      return;
    }

    try {
      const response = await axios.get(
        `${apiUrl}/cloud/search?query=${query}`, {
          headers: {
              "Authorization": `Bearer ${localStorage.getItem("token")}`
          }}
      );
      setSearchResults(response.data);
    } catch (err) {
      console.log(err);
    }
  }

  return (
    <Search>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <StyledInputBase
        placeholder="Search…"
        inputProps={{ 'aria-label': 'search' }}
        onChange={handleSearch}
      />
    </Search>
  )
}