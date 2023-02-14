import React, { useState } from "react";

import FormTextArea from "../FormTextArea";
import FormWrapModal from "../FormWrapModal";
import Button from "../Button";

export default function ModalReplyReview(props) {
  const { handleClose, showModal } = props;

  const [replyReview, setReplyReview] = useState("");
  const [msg, setMsg] = useState("");

  const _handleReplyReview = async (e) => {
    e.preventDefault();
    try {
      await replyReview(replyReview);
      setMsg("Reply Review Success");
    } catch (error) {
      setMsg("Reply Review Failed");
    }
  };

  if (!showModal) return null;
  return (
    <>
      <div className="fixed flex-col gap-10 inset-0 bg-primary-black bg-opacity-30 backdrop-blur-md flex justify-center items-center">
        <FormWrapModal>
          <h3 className="text-2xl text-center font-bold">Reply</h3>

          <div className="w-full">
            <div className="flex justify-between w-full">
              <p>jessicajane3</p>
              <div className="flex flex-col">
                <span class="flex items-center">
                  <svg
                    className="fill-primary-orange stroke-primary-orange w-4 h-4"
                    fill="none"
                    stroke="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    className="fill-primary-orange stroke-primary-orange w-4 h-4"
                    fill="none"
                    stroke="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    className="fill-primary-orange stroke-primary-orange w-4 h-4"
                    fill="none"
                    stroke="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    className="fill-primary-orange stroke-primary-orange w-4 h-4"
                    fill="none"
                    stroke="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                  <svg
                    className="stroke-primary-orange w-4 h-4"
                    fill="none"
                    stroke="none"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                  </svg>
                </span>
                <p>17 may 2026</p>
              </div>
            </div>
            <p>reviewwwwww</p>
          </div>

          <FormTextArea
            className="bg-secondary-white2"
            name="replyReview"
            type="textarea"
            required
            value={replyReview}
            onChange={(e) => setReplyReview(e.target.value)}
            placeholder="Response Review..."
          />
          <p>Anda hanya dapat merespon penilaian satu kali</p>

          <Button
            className="bg-primary-blue text-secondary-softblue font-bold uppercase text-sm px-6 py-3 rounded shadow mr-1 mb-1"
            type="button"
            onClick={_handleReplyReview}
          >
            Submit
          </Button>
          <Button
            className="font-bold bg-secondary-softblue text-primary-blue uppercase px-6 py-3 text-sm rounded shadow mr-1 mb-1"
            type="button"
            onClick={handleClose}
          >
            Close
          </Button>
        </FormWrapModal>
      </div>
    </>
  );
}
