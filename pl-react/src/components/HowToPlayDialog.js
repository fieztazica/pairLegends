import * as React from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import Button from "@mui/material/Button";

const HowToPlayDialog = ({ openState, onClose, dRef }) => (
    <Dialog
        open={openState}
        onClose={onClose}
        aria-labelledby="how-to-play-dialog-title"
        aria-describedby="how-to-play-dialog-description"
    >
        <DialogTitle id="how-to-play-dialog-title">How to play</DialogTitle>
        <DialogContent dividers>
            <DialogContentText
                id="how-to-play-dialog-description"
                ref={dRef}
                tabIndex={-1}
            >
                Nhiệm vụ của bạn rất đơn giản:
          <br />
          - Chỉ cần tìm hai hình giống nhau và đường nối
                  giữa hai hình đó gấp khúc không quá ba lần, click vào để loại bỏ chúng.

          <br />
          - Mỗi lần loại bỏ được hai hình bạn sẽ ghi điểm, trò chơi hoàn thành khi bạn loại
                  bỏ được hết các hình trước khi hết giờ, thời gian còn lại càng nhiều điểm của bạn càng cao.

          <br />
          - Khi không còn nước di chuyển trò chơi sẽ tự động đảo lại hình, số lần đảo là có giới hạn. Khi kết thúc
                  trò chơi, điểm số được cộng thêm số lần đảo.

          <br />
            </DialogContentText>
        </DialogContent>
        <DialogActions>
            <Button onClick={onClose}>I'm good</Button>
        </DialogActions>
    </Dialog>
);

export default HowToPlayDialog
