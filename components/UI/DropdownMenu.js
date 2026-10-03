"use client";

import { useId, useState } from "react";
import Menu from "@mui/material/Menu";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import ArticlesButton from "./Button";

export default function DropdownMenu({ title, children, sx, small = true }) {
    const [anchorEl, setAnchorEl] = useState(null);
    const menuId = useId();

    return (
        <>
            <ArticlesButton
                small={small}
                sx={sx}
                aria-controls={anchorEl ? menuId : undefined}
                aria-haspopup="menu"
                aria-expanded={Boolean(anchorEl)}
                onClick={(event) => setAnchorEl(event.currentTarget)}
                endIcon={<ArrowDropDownIcon />}
            >
                {title}
            </ArticlesButton>
            <Menu
                id={menuId}
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={() => setAnchorEl(null)}
                slotProps={{ list: { sx: { maxHeight: 600, width: 200 } } }}
            >
                {typeof children === "function" ? children(() => setAnchorEl(null)) : children}
            </Menu>
        </>
    );
}
