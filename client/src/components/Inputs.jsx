import React, { useState } from 'react'
import FileOptions from "./FileOptions"

function Inputs({ socket, code, options, setoptions }) {
    const [message, setmessage] = useState("")

    const sendchat = (e) => {
        e.preventDefault();
        if (socket && message.trim()) {
            const messageData = { roomId: code, message };
            socket.emit("message", messageData);
            setmessage("");
        } else console.log("Socket is not connected or message is empty.");
    };

    return (
        <>
            <div className="w-full sm:w-[80%] md:w-[60%] lg:w-[33%] max-w-[40%] flex justify-start md:justify-center">
                <div className="flex justify-start md:justify-center items-center gap-4 w-full ">
                    <form onSubmit={sendchat} className="flex w-full gap-4 justify-start items-center">
                        <input
                            type="text"
                            className="rounded-lg md:w-full w-[150px]  lg:w-[500px] h-[40px] md:h-[55px] p-2 text-white text-xs md:text-md outline-none border-none overflow-hidden bg-blue-900 resize-none whitespace-normal"
                            value={message}
                            onChange={(e) => setmessage(e.target.value)}
                            placeholder="Type a message..."
                        />
                        <button
                            type="submit"
                            className="md:p-2 p-1 rounded-full bg-blue-900 transition-all active:shadow-inner active:shadow-white active:scale-110"
                            onClick={sendchat}
                        >
                            <i className="fa fa-paper-plane md:text-[30px] text-[#03032fee]" aria-hidden="true"></i>
                        </button>
                        <button
                            className="md:p-2 rounded-full bg-blue-900 transition-all active:shadow-inner active:shadow-white active:scale-110 px-1 py-1"
                            onClick={(e) => {
                                e.preventDefault();
                                setoptions(prev => !prev)
                            }}
                        >
                            <i className="fa fa-paperclip fa md:text-[30px] text-[#03032fee]" aria-hidden="true"></i>
                        </button>
                    </form>
                    <FileOptions options={options} socket={socket} code={code} />
                </div>
            </div>
        </>
    )
}

export default Inputs
