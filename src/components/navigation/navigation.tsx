import React, { FC, useState, ChangeEvent, DragEvent } from 'react';
import bookOpen from '@/assets/icon/book-open.svg';
import chartLine from '@/assets/icon/ChartLine.svg';
import chartScatter from '@/assets/icon/chart-scatter1.svg';
import fileText from '@/assets/icon/file-text.svg';
import trello from '@/assets/icon/trello.svg';
import gear from '@/assets/icon/Gear.svg';
import './navigation.css';
import { NavLink, useLocation } from 'react-router-dom';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import CloudUploadOutlinedIcon from '@mui/icons-material/CloudUploadOutlined';
import { uploadFile } from '../../utils/downloadAPI';

const OpenComponent: React.FC = () => {
  const location = useLocation();
  const token = localStorage.getItem('accessToken') ?? '';
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handleFileUpload = (event: ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedFile(file);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
  };

  const handleDragEnter = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragOver = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDragLeave = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
  };

  const handleDrop = (event: DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const file = event.dataTransfer.files[0];
    if (file) {
      setSelectedFile(file);
    }
  };

  const handleUpload = () => {
    if (selectedFile) {
      uploadFile(selectedFile, token)
        .then((data) => {
          console.log('Файл успешно отправлен', data);
          closeModal();
        })
        .catch((error) => {
          console.error('Ошибка при отправке файла', error);
        });
    }
  };

  const dropZoneStyle: React.CSSProperties = {
    border: '2px dashed #cccccc',
    padding: '20px',
    textAlign: 'center',
    cursor: 'pointer',
    borderRadius: '24px',
  };

  const activeDropZoneStyle: React.CSSProperties = {
    border: '2px dashed #007acc',
  };

  return (
    <div className="open">
      <div className="open__menu">
        <h2 className="open__menu-span">Аналитика</h2>
        <nav className="open__nav">
          <NavLink
            to="/"
            className={`open__menu-link ${
              location.pathname === '/' ? 'open__menu-active' : ''
            }`}
          >
            <img className="open__nav-img" src={trello} alt="Icon 1" />
            Планер
          </NavLink>
          <NavLink
            to="/forecast"
            className={`open__menu-link ${
              location.pathname === '/forecast' ? 'open__menu-active' : ''
            }`}
          >
            <img className="open__nav-img" src={chartScatter} alt="Icon 1" />
            Прогноз
          </NavLink>
          <NavLink
            to="/statistics"
            className={`open__menu-link ${
              location.pathname === '/statistics' ? 'open__menu-active' : ''
            }`}
          >
            <img className="open__nav-img" src={chartLine} alt="Icon 1" />
            Статистика
          </NavLink>
          <NavLink
            to="/reports"
            className={`open__menu-link ${
              location.pathname === '/reports' ? 'open__menu-active' : ''
            }`}
            style={{ pointerEvents: 'none', opacity: 0.5 }}
          >
            <img className="open__nav-img" src={fileText} alt="Icon 1" />
            Отчеты
          </NavLink>
          <NavLink
            to="/library"
            className={`open__menu-link ${
              location.pathname === '/library' ? 'open__menu-active' : ''
            }`}
            style={{ pointerEvents: 'none', opacity: 0.5 }}
          >
            <img className="open__nav-img" src={bookOpen} alt="Icon 1" />
            Библиотека
          </NavLink>
        </nav>
      </div>
      <div>
        <div>
          <Button
            variant="contained"
            onClick={openModal}
            style={{
              background: 'transparent',
              padding: '0',
              boxShadow: 'none',
            }}
          >
            <CloudUploadOutlinedIcon
              style={{ color: '#003C96', padding: '16px 24px' }}
            />
          </Button>
          <Modal open={isModalOpen} onClose={closeModal}>
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 400,
                bgcolor: 'background.paper',
                boxShadow: 24,
                p: 4,
                borderRadius: '24px',
              }}
            >
              <Box sx={{ display: 'flex', marginBottom: '16px' }}>
                <CloudUploadOutlinedIcon
                  style={{ color: '#003C96', margin: 'auto 16px auto 0' }}
                />
                <Typography
                  variant="h6"
                  component="div"
                  gutterBottom
                  sx={{ margin: 0, color: '#003C96' }}
                >
                  Выбор файла
                </Typography>
              </Box>

              <div
                onDragEnter={handleDragEnter}
                onDragOver={handleDragOver}
                onDragLeave={handleDragLeave}
                onDrop={handleDrop}
              >
                <div
                  style={{
                    ...dropZoneStyle,
                    ...(selectedFile ? activeDropZoneStyle : {}),
                  }}
                >
                  {selectedFile ? (
                    <>
                      <p>Выбранный файл: {selectedFile.name}</p>
                      <p>Иконка: {selectedFile.type}</p>
                    </>
                  ) : (
                    <>
                      <p>Перетащите файл сюда или</p>
                      <input
                        type="file"
                        onChange={handleFileUpload}
                        accept=".csv"
                      />
                    </>
                  )}
                </div>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  {selectedFile && (
                    <Button
                      variant="contained"
                      onClick={handleUpload}
                      sx={{
                        marginTop: '24px',
                        borderRadius: '40px',
                        backgroundColor: '#003C96',
                      }}
                    >
                      Отправить файл
                    </Button>
                  )}
                  {selectedFile && (
                    <Button
                      variant="contained"
                      onClick={handleClearFile}
                      sx={{
                        marginTop: '24px',
                        borderRadius: '40px',
                        backgroundColor: '#003C96',
                      }}
                    >
                      Очистить файл
                    </Button>
                  )}
                </Box>
              </div>
            </Box>
          </Modal>
        </div>

        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            margin: '16px 24px',
          }}
        >
          <img style={{ width: '32px' }} src={gear} alt="gear" />
          <span>Настройки</span>
        </div>
      </div>
    </div>
  );
};

const Navigation: FC = () => {
  return (
    <div style={{ display: 'flex' }}>
      <div className="menu">
        <OpenComponent />
      </div>
    </div>
  );
};

export default Navigation;
