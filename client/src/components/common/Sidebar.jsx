import React, { useEffect, useState } from "react";
import {
  Drawer,
  IconButton,
  List,
  ListItemButton,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import LogoutOutlined from "@mui/icons-material/LogoutOutlined";
import AddBoxOutlined from "@mui/icons-material/AddBoxOutlined";
import assets from "../../assets/index";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import memoApi from "../../api/memoApi";
import { setMemo } from "../../redux/features/memoSlice";

const Sidebar = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // react-router-domのuseParamsでURLのパラメーターを受け取れる
  const { memoId } = useParams();
  const user = useSelector((state) => state.user.value);
  const memos = useSelector((state) => state.memo.value);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  useEffect(() => {
    const getMemos = async () => {
      try {
        const res = await memoApi.getAll();
        dispatch(setMemo(res));
      } catch (err) {
        alert(err);
      }
    };
    getMemos();
  }, [dispatch]);

  useEffect(() => {
    {
      // findIndexはJavaScriptのArrayメソッド
      //memosに入っている添字を一つ一つ探してくる
      //memoIdと同じidを持ったmemoの添字だけを返す
      const activeIndex = memos.findIndex((e) => e._id === memoId);
      setActiveIndex(activeIndex);
    }
  }, [navigate]);

  const addMemo = async () => {
    try {
      const res = await memoApi.create();
      const newMemos = [res, ...memos];
      dispatch(setMemo(newMemos));
      navigate(`memo/${res._id}`);
    } catch (err) {
      alert(err);
    }
  };

  return (
    /* https://mui.com/material-ui/react-drawer/ */
    /* open={true}は常に表示 */
    <Drawer
      container={window.document.body} //親コンテナを指定。window.document.bodyはHTMLの body 要素の直下に表示
      variant="permanent" //表示モードを指定。permanentが指定されているため、常に表示
      open={true} //Drawerが開かれているかどうかを指定。true が指定されているため、開かれた状態で表示
      sx={{ width: 250, height: "100vh" }}
    >
      <List
        sx={{
          width: 250,
          height: "100vh",
          backgroundColor: assets.colors.secondary,
        }}
      >
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            {/* variant プロパティは、テキストの見出しの種類を指定 */}
            <Typography variant="body2" fontWeight="700">
              {user.username}
            </Typography>
            <IconButton onClick={logout}>
              <LogoutOutlined />
            </IconButton>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              お気に入り
            </Typography>
          </Box>
        </ListItemButton>
        <Box sx={{ paddingTop: "10px" }}></Box>
        <ListItemButton>
          <Box
            sx={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
            }}
          >
            <Typography variant="body2" fontWeight="700">
              プライベート
            </Typography>
            <IconButton onClick={() => addMemo()}>
              <AddBoxOutlined fontSize="small" />
            </IconButton>
          </Box>
        </ListItemButton>
        {memos.map((item, index) => (
          <ListItemButton
            sx={{ pl: "20px" }}
            component={Link}
            to={`memo/${item._id}`}
            key={item._id}
            selected={index === activeIndex}
          >
            <Typography>
              {item.icon} {item.title}
            </Typography>
          </ListItemButton>
        ))}
      </List>
    </Drawer>
  );
};

export default Sidebar;
