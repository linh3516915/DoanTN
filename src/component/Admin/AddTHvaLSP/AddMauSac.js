import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Thiết lập phần tử gốc cho modal

export default function PopupAddMauSac({ isOpen, onRequestClose,onthemmoiMS }) {
    const [ten_mau_sac, setTenMauSac] = useState('');
    

    const handleAddMauSac = async (e) => {
        e.preventDefault();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await Promise.all([handleAddMauSac(event)]);
            alert('Thêm Màu Sắc thành công');
            onRequestClose();
        } catch (error) {
            alert('Lỗi thêm Màu Sắc  ');
            console.error('Lỗi trong handleSubmit:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
            
        }
     
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Thêm Màu Sắc "
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
            <h2>Thêm Màu Sắc </h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label> Màu Sắc</label>
                    <input
                        type="text"
                        value={ten_mau_sac}
                        onChange={(e) => setTenMauSac(e.target.value)}
                    />
                </div>
                
                <div style={{ textAlign:'center', marginTop:'10px'}}>
                <button onClick={()=>{
                    setTimeout(() => {
                        onthemmoiMS(ten_mau_sac)
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