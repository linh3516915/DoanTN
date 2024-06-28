import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Thiết lập phần tử gốc cho modal

export default function PopupAddLSP({ isOpen, onRequestClose,onthemmoi }) {
    const [loaisp, setLoaiSP] = useState('');
    // const [tenncc, setTenNCC] = useState('');

    const handleAddLSP = async (e) => {
        e.preventDefault();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await Promise.all([handleAddLSP(event)]);
            alert('Thêm loại sản phẩm  thành công');
            onRequestClose();
        } catch (error) {
            alert('Lỗi thêm loại sản phẩm ');
            console.error('Lỗi trong handleSubmit:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
            
        }
     
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Thêm Loại Sản Phẩm "
            style={{
                overlay: {
                  backgroundColor: 'rgba(0, 0, 0, 0.5)',
                },
                content: {
                  top: '50%',
                  left: '50%',
                  right: 'auto',
                  bottom: 'auto',
                  marginRight: '-50%',
                  transform: 'translate(-50%, -50%)',
                  width: '500px', // Điều chỉnh độ rộng của modal
                },
              }}

        >
            <h2>Thêm Loại Sản Phẩm </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Loại Sản Phẩm</label>
                    <input
                        type="text"
                        value={loaisp}
                        onChange={(e) => setLoaiSP(e.target.value)}
                    />
                </div>
                
                <div style={{ textAlign:'center', marginTop:'10px'}}>
                <button onClick={()=>{
                    setTimeout(() => {
                        onthemmoi(loaisp)
                    }, 1000);
                }
                  
                }  type="submit">Thêm</button>
                </div>
                <div style={{ float:'right'}}>
                <button type="button" onClick={onRequestClose}>Thoát</button>
                </div>
            </form>
        </Modal>
    );
}