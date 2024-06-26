import { FaMusic, FaBookmark } from "react-icons/fa";
import { IoBook, IoVideocam } from "react-icons/io5";

export const NAV_LINKS = [
    {
        title: "słówka",
        icon: FaBookmark,
        href: "/slowka",
    },
    {
        title: "czytaj",
        icon: IoBook,
        href: "/czytaj",
    },
    {
        title: "filmiki",
        icon: IoVideocam,
        href: "/filmiki",
    },
    {
        title: "muzyka",
        icon: FaMusic,
        href: "/muzyka",
    },
];
