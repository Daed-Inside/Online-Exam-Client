import React, { useEffect, useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelOutlinedIcon from "@mui/icons-material/CancelOutlined";
import SentimentVerySatisfiedOutlinedIcon from "@mui/icons-material/SentimentVerySatisfiedOutlined";
import MoodBadOutlinedIcon from "@mui/icons-material/MoodBadOutlined";

function ApiStatusDialog({ children, ...props }) {
  const { msg, open, status } = props;
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          {status === 1 ? (
            <div style={{ textAlign: "center" }}>
              <CheckCircleOutlineIcon
                sx={{ fontSize: 100 }}
                className="icon"
                color="success"
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CancelOutlinedIcon
                sx={{ fontSize: 100, color: "red" }}
                className="icon"
              />
            </div>
          )}
          <DialogTitle sx={{ fontSize: "20px", textAlign: "center" }}>
            {msg}
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export function SubmitDialog({ children, ...props }) {
  const { msg, open, status, score } = props;
  return (
    <div>
      <Dialog
        open={open}
        keepMounted
        fullWidth={true}
        maxWidth={"sm"}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
          {status === 2 ? (
            <div style={{ textAlign: "center" }}>
              <SentimentVerySatisfiedOutlinedIcon
                sx={{ fontSize: 100 }}
                className="icon"
                color="success"
              />
            </div>
          ) : status === 1 ? (
            <div style={{ textAlign: "center" }}>
              <MoodBadOutlinedIcon
                sx={{ fontSize: 100, color: "red" }}
                className="icon"
              />
            </div>
          ) : (
            <div style={{ textAlign: "center" }}>
              <CancelOutlinedIcon
                sx={{ fontSize: 100, color: "red" }}
                className="icon"
              />
            </div>
          )}
          <DialogTitle
            sx={{
              fontSize: "50px",
              textAlign: "center",
              color: status === 2 ? "green" : "red",
            }}
          >
            {score} Points
          </DialogTitle>
          <DialogTitle sx={{ fontSize: "20px", textAlign: "center" }}>
            {msg}
          </DialogTitle>
        </DialogContent>
      </Dialog>
    </div>
  );
}

export default ApiStatusDialog;
