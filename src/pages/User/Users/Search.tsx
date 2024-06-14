import { Box, InputAdornment, InputBase, Pagination, TextField, alpha, styled } from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import { UserGroup } from "./UserGroup";
import { useDispatch, useSelector } from "../../../redux/store";
import { useEffect, useMemo, useState } from "react";
import { autocompleteUsers, getUsers, setPage } from "../../../redux/slices/user";
import useDebounce from "../../../services/hooks";

export const SearchBox = () => {
  const dispatch = useDispatch();
  const { users, autocomplete, page, pageCount } = useSelector(store => store.user);
  const [searchText, setSearchText] = useState('');
  const [paginationPage, setPaginationPage] = useState(1);
  const debouncedText = useDebounce(searchText, 400);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handlePaginationChange = (event: React.ChangeEvent<unknown>, value: number) => {
    setPaginationPage(value);
  };
  
  useEffect(() => {
    dispatch(setPage(paginationPage));
  }, [paginationPage, dispatch]);

  useEffect(() => {
    if (debouncedText) {
      dispatch(autocompleteUsers(debouncedText));
    } else {
      dispatch(getUsers());
    }
  }, [debouncedText, dispatch, page]);

  useEffect(() => {
    setPaginationPage(1);
    dispatch(setPage(1));
  }, [debouncedText, dispatch]);

  const usersList = useMemo(() => (debouncedText ? autocomplete : users), [autocomplete, users, debouncedText]);


  return (
    <div style={{ position: "relative", display: "flex", alignItems: "center", justifyContent: "right", height: "100vh" }}>
      <Box sx={{ background: "white", height: "100%", width: "300px", alignSelf: "center", overflowY: "auto", 
        scrollbarWidth: "none", // Firefox
        msOverflowStyle: "none", // Internet Explorer 10+
        '&::-webkit-scrollbar': { // WebKit browsers (Chrome, Safari)
          display: 'none',
        } }}>
        <div style={{ display: "flex", justifyContent: "flex-end"}}>
          
          <TextField InputProps={{
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
          }} 
          variant="filled" value={searchText} onChange={handleInputChange} sx={{width: "100%"}}>
          
          </TextField>
          
        </div>

          {usersList ? (<UserGroup users={usersList}></UserGroup>) : null}
          <Pagination style={{
          position: "absolute", 
          bottom: 70,
          background: "white", 
          borderTop: "1px solid #ddd",
          padding: "10px",
          width: "100%", height: "100px"
          }} 
          page={paginationPage} onChange={handlePaginationChange} count={pageCount} color="primary" />
              
          <Box sx={{height: 192}}></Box>
        
      </Box>
    </div>
  );
};
