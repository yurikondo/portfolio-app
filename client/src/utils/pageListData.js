import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import NotificationsIcon from "@mui/icons-material/Notifications";
import EmojiEmotionsIcon from "@mui/icons-material/EmojiEmotions";


export const pageListData = [
  { id: "home", text: "ホーム", icon: <HomeIcon />, path: "/" },
  {
    id: "profile",
    text: "プロフィール",
    icon: <EmojiEmotionsIcon />,
    path: "profile",
  },
  {
    id: "favorite",
    text: "お気に入り",
    icon: <FavoriteIcon />,
    path: "favorite",
  },
  {
    id: "followings",
    text: "フォロー",
    icon: <NotificationsIcon />,
    path: "followings",
  },
];
