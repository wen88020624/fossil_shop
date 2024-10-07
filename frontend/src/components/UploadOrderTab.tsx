import React, { useState } from "react";
import { Upload, UploadProps, Button, message } from "antd";
import { InboxOutlined } from '@ant-design/icons';
import * as Papa from "papaparse";
import axios from "axios";

const { Dragger } = Upload;

const props: UploadProps = {
  name: 'file',
  multiple: true,
  action: 'http://localhost:5001/api/uploadCSV',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const UploadOrderTab: React.FC = () => {
  const [file, setFile] = useState<File | null>(null);
  const [data, setData] = useState<any[]>([]);

  const handleFileChange = (file: File) => {
    setFile(file);
    Papa.parse(file, {
      complete: (results) => {
        setData(results.data);
        message.success(`${file.name} file parsed successfully.`);
      },
      header: true,
    });
    return false; // Prevent automatic upload
  };

  const handleUpload = async () => {
    if (!file) {
      message.error("No file selected for upload.");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post("http://your-api-endpoint/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      message.success("File uploaded successfully.");
    } catch (error) {
      message.error("File upload failed.");
    }
  };

  return (
    <div>
      <a href="/template.csv" download>
        <button>下載CSV模板</button>
      </a>
      <Dragger
        name="file"
        multiple={false}
        beforeUpload={handleFileChange}
        showUploadList={false}
        accept=".csv"
      >
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">Click or drag file to this area to upload</p>
        <p className="ant-upload-hint">Support for a single upload. Only CSV files are allowed.</p>
      </Dragger>
      <Button type="primary" onClick={handleUpload} disabled={!file}>
        確認上傳
      </Button> 
      {data.length > 0 && (
        <div>
          <h3>資料預覽</h3>
          <pre>{JSON.stringify(data.slice(0, 5), null, 2)}</pre> {/* 預覽5列 */}
        </div>
      )}
    </div>
  );
};

export default UploadOrderTab;
