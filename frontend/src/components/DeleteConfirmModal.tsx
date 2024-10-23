import React from 'react';
import { Modal } from 'antd';

interface DeleteConfirmModalProps {
  visible: boolean;
  onConfirm: () => void;
  onCancel: () => void;
}

const DeleteConfirmModal: React.FC<DeleteConfirmModalProps> = ({ visible, onConfirm, onCancel }) => (
  <Modal
    title="刪除訂單"
    visible={visible}
    onOk={onConfirm}
    onCancel={onCancel}
    okText="確認"
    cancelText="取消"
  >
    <p>確定要刪除這筆訂單嗎？</p>
  </Modal>
);

export default DeleteConfirmModal;
