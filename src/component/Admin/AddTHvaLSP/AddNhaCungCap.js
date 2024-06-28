import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';

Modal.setAppElement('#root'); // Thiết lập phần tử gốc cho modal

export default function PopupAddNCC({ isOpen, onRequestClose,onthemmoincc }) {
  
    const [tenncc, setTenNCC] = useState('');

    const handleAddNCC = async (e) => {
        e.preventDefault();
    };
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await Promise.all([handleAddNCC(event)]);
            alert('Thêm nha cung cap  thành công');
            onRequestClose();
        } catch (error) {
            alert('Lỗi thêm nha cung cap ');
            console.error('Lỗi trong handleSubmit:', error);
            throw error; // Ném lỗi để handleSubmit bắt và xử lý
            
        }
     
    };

    return (
        <Modal
            isOpen={isOpen}
            onRequestClose={onRequestClose}
            contentLabel="Thêm Nha Cung Cap "
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
            <h2>Thêm Nha Cung Cap</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nha Cung Cap</label>
                    <input
                        type="text"
                        value={tenncc}
                        onChange={(e) => setTenNCC(e.target.value)}
                    />
                </div>
                
                <div style={{ textAlign:'center', marginTop:'10px'}}>
                <button onClick={()=>{
                    setTimeout(() => {
                        onthemmoincc(tenncc)
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