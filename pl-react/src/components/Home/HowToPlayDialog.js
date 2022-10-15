import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";
import Typography from "@mui/material/Typography";
import Chip from "@mui/material/Chip";

const HowToPlayDialog = ({ openState, onClose }) => (
    <Dialog
        open={openState}
        onClose={onClose}
    >
        <DialogTitle>How To Play</DialogTitle>
        <DialogContent dividers>
            <Typography align="center" variant="h6" component="h6" gutterBottom>
                YOUR DUTY
            </Typography>
            <DialogContentText
                tabIndex={-1}
            >
                - Find a couple of legends and make sure their way to each other is not turn more than 3 times, click on them to remove.
                <br />
                - Each time you remove 2 legends you will get score, the game will be done when you remove all the legends before reaching time (5 mins), the more time left you have, the higher score you get.
                <br />- When there is no move, the board will be reloaded, reload board is limitless.
            </DialogContentText>
            <Divider sx={{ p: 2 }}>
                <Chip color="primary" label="ENG / VIE" />
            </Divider>
            <Typography align="center" variant="h6" component="h6" gutterBottom>
                NHIỆM VỤ
            </Typography>
            <DialogContentText
                tabIndex={-1}
            >
                - Chỉ cần tìm hai hình giống nhau và đường nối giữa hai hình đó gấp khúc
                không quá ba lần, click vào để loại bỏ chúng.
                <br />
                - Mỗi lần loại bỏ được hai hình bạn sẽ ghi điểm, trò chơi hoàn thành khi
                bạn loại bỏ được hết các hình trước khi hết giờ (5 phút), thời gian còn lại càng
                nhiều điểm của bạn càng cao.
                <br />- Khi không còn nước di chuyển trò chơi sẽ tự động đảo lại hình,
                số lần đảo là khong giới hạn.
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>I'm good</Button>
        </DialogActions>
    </Dialog>
);

export default HowToPlayDialog;
