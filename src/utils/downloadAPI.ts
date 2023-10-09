export const FetchDownloadXlsx = (urlData: string, token: string) => {
    fetch(urlData, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            if (response.headers.get('Content-Length') === '0') {
              console.error('Пустой ответ от сервера');
              return;
            }
            return response.blob(); // Получаем содержимое файла в виде блоба
          } else {
            console.error('Ошибка при загрузке файла:', response.statusText);
          }
        })
        .then((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'file.xlsx';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        })
        .catch((error) => {
          console.error('Ошибка при загрузке файла:', error);
        });
};

export const FetchDownloadCsv = (urlData: string, token: string) => {
    fetch(urlData, {
        method: 'GET',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => {
          if (response.ok) {
            if (response.headers.get('Content-Length') === '0') {
              console.error('Пустой ответ от сервера');
              return;
            }
            return response.blob();
          } else {
            console.error('Ошибка при загрузке файла:', response.statusText);
          }
        })
        .then((blob) => {
          if (blob) {
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = 'file.csv';
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
          }
        })
        .catch((error) => {
          console.error('Ошибка при загрузке файла:', error);
        });
}

export async function uploadFile(file: File, token: string) {
  const formData = new FormData();
  formData.append('file', file);

  try {
    const response = await fetch('http://158.160.123.145/api/v1/sales/upload/', {
      method: 'POST',
      body: formData,
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-Type': 'text/csv',
      },
    });

    if (!response.ok) {
      throw new Error('Ошибка при отправке файла');
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}