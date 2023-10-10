import { Box, Grid } from '@mui/material';
import styles from './statistics.module.scss';
import Features from '../../components/features/features';
import Error from '../../components/error';
import {
  CustomPaper,
  LeftDescBlock,
  LineDesc,
  LineDescLeftPart,
  LineDescRightPart,
  RightDescBlock,
  TitleDesc,
  TitleGraph,
  TitleGraphBlock,
  TitleList,
  TitleListLi,
  TitleListSpan,
} from '../../components/formelements';
import { LineChart } from '@mui/x-charts/LineChart';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { RootState } from '../../services/redux/store';
import { useAppSelector } from '../../services/typeHooks';
import { useEffect, useState } from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { DOWNLOAD_URL } from '../../utils/constants';
import { FetchDownloadXlsx, FetchDownloadCsv } from '../../utils/downloadAPI';

// const seriesA = {
//   id: 'Aseria',
//   data: [2, 3, 4, 3, 4],
//   label: 'Прогноз',
//   color: '#2FCBFF',
// };
// const seriesB = {
//   id: 'Bseria',
//   data: [],
//   label: 'Факт',
//   color: '#FFB900',
// };

const columns: GridColDef[] = [
  {
    field: 'id',
    headerName: '#',
    width: 10,
  },
  {
    field: 'st_id',
    headerName: 'Код ТК',
    width: 200,
  },
  {
    field: 'pr_sku_id',
    headerName: 'Товар (SKU)',
    width: 150,
    editable: false,
  },
  {
    field: 'pr_uom_id',
    headerName: 'Единица измерения',
    // type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'data',
    headerName: 'Дата',
    // type: 'number',
    width: 110,
    editable: false,
  },
  {
    field: 'target',
    headerName: 'Прогноз спроса',
    // type: 'number',
    width: 110,
    editable: false,
  },
];

// const rows = [
//   {
//     id: 1,
//     sku: 'Jon',
//     messurement: 'шт',
//     data: '23.08.2023',
//     forecast: '4',
//   },
//   {
//     id: 2,
//     sku: 'Cersei',
//     messurement: 'шт',
//     data: '23.08.2023',
//     forecast: '4',
//   },
// ];

interface TransformedData {
  id: number;
  st_id: string;
  pr_sku_id: string;
  pr_uom_id: string;
  data: string;
  target: string;
}

const Statistics = () => {
  const sales = useAppSelector((state: RootState) => state.sale.data); //данные продаж
  const predicto = useAppSelector((state: RootState) => state.predict.data); //данные прогноза

  const [maxPredict, setMaxPredict] = useState<number>(0); //Максимальный прогноз
  const [sumPredict, setSumPredict] = useState<number>(0); //Сумма прогноза
  const [targets, setTargets] = useState<number[]>([0, 0]); //Значения прогноза
  const [dates, setDates] = useState<string[]>(['', '']); //Даты прогноза
  const [transformedData, setTransformedData] = useState<TransformedData[]>([{ id: 0, st_id: '', pr_sku_id: '', pr_uom_id: '', data: '', target: '' }]); //Данные для таблицы

  const [maxSale, setMaxSale] = useState<number>(0); //Максимальная продажа
  const [sumSale, setSumSale] = useState<number>(0); //Сумма продаж
  const [ssales, setSales] = useState<number[]>([0, 0]); //Значения продаж
  const [sdates, setSDates] = useState<string[]>(['', '']); //Даты продаж

  const [open, setOpen] = useState(false);
  const tk = useAppSelector((state) => state.filter.tk);
  const sku = useAppSelector((state) => state.filter.sku);
  const token = localStorage.getItem('accessToken') ?? '';
  useEffect(() => {
    if (predicto.length > 0) {
      const predictArray = predicto[0].product.predict;
      const sortedData = [...predictArray].reverse();
      const updatedTargets: number[] = [];
      const updatedDates: string[] = [];
      let lmax = 0; //локальный максимум
      let lsum = 0; //локальная сумма
      sortedData.forEach((item) => {
        if (lmax < item.target) lmax = item.target;
        lsum += item.target;
        updatedTargets.push(item.target);
        const date = new Date(item.date);
        const formattedDate = `${
          date.getDate() < 10 ? '0' : ''
        }${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${
          date.getMonth() + 1
        }`;
        updatedDates.push(formattedDate);
      });
      setMaxPredict(lmax);
      setSumPredict(lsum);
      setTargets(updatedTargets);
      setDates(updatedDates);
      // let increment = 0;
      // const tData: TransformedData[] = sortedData.map((item) => {
      //   const date = new Date(item.date);
      //   increment++;
      //   const formattedDate = `${
      //     date.getDate() < 10 ? '0' : ''
      //   }${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${
      //     date.getMonth() + 1
      //   }`;
      //   return {
      //     id: increment,
      //     st_id: predicto[0].st_id,
      //     pr_sku_id: predicto[0].product.pr_sku_id,
      //     pr_uom_id: predicto[0].product.pr_uom_id.toString(), // преобразовываем в строку
      //     data: formattedDate,
      //     target: item.target.toString(), // преобразовываем в строку
      //   };
      // });
      // setTransformedData(tData);
    }
    if (sales.length > 0 && sales[0].products.length > 0) {
      const spredictArray = sales[0].products[0].sales;
      const ssortedData = [...spredictArray].reverse();
      const supdatedTargets: number[] = [];
      const supdatedDates: string[] = [];
      let slmax = 0; //локальный максимум
      let slsum = 0; //локальная сумма
      ssortedData.forEach((item) => {
        if (slmax < item.pr_sales_in_units) slmax = item.pr_sales_in_units;
        slsum += item.pr_sales_in_units;
        supdatedTargets.push(item.pr_sales_in_units);
        const sdate = new Date(item.date);
        const sformattedDate = `${
          sdate.getDate() < 10 ? '0' : ''
        }${sdate.getDate()}.${sdate.getMonth() + 1 < 10 ? '0' : ''}${
          sdate.getMonth() + 1
        }`;
        supdatedDates.push(sformattedDate);
      });
      setMaxSale(slmax);
      setSumSale(slsum);
      setSales(supdatedTargets);
      setSDates(supdatedDates);
      let increment = 0;
      const stData: TransformedData[] = ssortedData.map((item) => {
        const date = new Date(item.date);
        increment++;
        const formattedDate = `${
          date.getDate() < 10 ? '0' : ''
        }${date.getDate()}.${date.getMonth() + 1 < 10 ? '0' : ''}${
          date.getMonth() + 1
        }`;
        return {
          id: increment,
          st_id: sales[0].st_id,
          pr_sku_id: sales[0].products[0].pr_sku_id,
          pr_uom_id: sales[0].products[0].pr_uom_id.toString(), // преобразовываем в строку
          data: formattedDate,
          target: item.pr_sales_in_units.toString(), // преобразовываем в строку
        };
      });
      setTransformedData(stData);
    }
  }, [predicto, sales]);

  const handleExportClick = () => {
    setOpen(true);
  };

  const handleExcelExport = () => {
    const downloadUrl = `${DOWNLOAD_URL}?filetype=xlsx&st_id=${tk.id}&pr_sku_id=${sku.id}`;
    FetchDownloadXlsx(downloadUrl, token);
    setOpen(false);
  };

  const handleCsvExport = () => {
    const downloadUrl = `${DOWNLOAD_URL}?filetype=csv&st_id=${tk.id}&pr_sku_id=${sku.id}`;
    FetchDownloadCsv(downloadUrl, token);
    setOpen(false);
  };

  try{
    if (targets.length > 0 && dates.length > 0) {
      return (
        <div className="" style={{ margin: '40px 24px', width: '100vw' }}>
          <Features title={'Статистика'} />
          <Grid container rowSpacing={3} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
            <Grid item xs={6}>
              <CustomPaper>
                <TitleGraphBlock>
                  <TitleGraph>
                    График продаж и прогнозирования
                    <br />
                    спроса за предыдущие 14 дней
                  </TitleGraph>
                  <TitleList>
                    <TitleListLi>
                      <TitleListSpan
                        style={{ backgroundColor: '#2FCBFF' }}
                      ></TitleListSpan>
                      <Box>Прогноз</Box>
                    </TitleListLi>
                    <TitleListLi>
                      <TitleListSpan
                        style={{ backgroundColor: '#FFB900' }}
                      ></TitleListSpan>
                      <Box>Факт</Box>
                    </TitleListLi>
                  </TitleList>
                </TitleGraphBlock>
                <Grid style={{ display: 'flex' }}>
                  <LeftDescBlock>
                    <LineChart
                      xAxis={[
                        {
                          data: sdates,
                          scaleType: 'band',
                        },
                      ]}
                      yAxis={[
                        {
                          min: 0,
                          max:
                            maxSale > maxPredict ? maxSale + 1 : maxPredict + 1,
                        },
                      ]}
                      series={[
                        {
                          id: 'Aseria',
                          data: ssales,
                          label: 'Прогноз',
                          color: '#FFB900',
                        },
                      ]} //, { ...seriesB }
                      height={252}
                      margin={{ top: 10, right: 30, bottom: 20, left: 33 }}
                      sx={{
                        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                          display: 'none',
                        },
                        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                          stroke: '#F0F0F0',
                          strokeWidth: 1,
                        },
                        '& .MuiChartsAxis-tick': {
                          stroke: '#F0F0F0',
                          strokeWidth: 1,
                        },
                        '.MuiChartsLegend-root': {
                          display: 'none',
                        },
                        '.MuiChartsAxis-tickLabel': {
                          fontFamily: 'Futura PT',
                          color: '#4D4D4D',
                          fontSize: '10px',
                        },
                        '.MuiMarkElement-root1': {
                          stroke: '#8884d8',
                          scale: '0.6',
                          fill: '#fff',
                          strokeWidth: 1,
                        },
                      }}
                    />
                  </LeftDescBlock>
                  <RightDescBlock>
                    <div style={{ marginBottom: '16px' }}>
                      <TitleDesc>Всего:</TitleDesc>
                      <LineDesc>
                        <LineDescLeftPart>Факт</LineDescLeftPart>
                        <LineDescRightPart>{sumSale}</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>Прогноз</LineDescLeftPart>
                        <LineDescRightPart>{sumPredict}</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>
                          Точность
                          <br /> прогноза
                        </LineDescLeftPart>
                        <LineDescRightPart style={{ color: 'green' }}>
                          -
                        </LineDescRightPart>
                      </LineDesc>
                    </div>
                    <div>
                      <TitleDesc>В прошлом:</TitleDesc>
                      <LineDesc>
                        <LineDescLeftPart>год</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>месяц</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>неделя</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                    </div>
                  </RightDescBlock>
                </Grid>
              </CustomPaper>
            </Grid>
            <Grid item xs={6}>
              <CustomPaper>
                <TitleGraphBlock>
                  <TitleGraph>
                    График прогнозирования спроса
                    <br />
                    на следующие 14 дней
                  </TitleGraph>
                  <TitleList>
                    <TitleListLi>
                      <TitleListSpan
                        style={{ backgroundColor: '#2FCBFF' }}
                      ></TitleListSpan>
                      <Box>Прогноз</Box>
                    </TitleListLi>
                  </TitleList>
                </TitleGraphBlock>
                <Grid style={{ display: 'flex' }}>
                  <LeftDescBlock>
                    <LineChart
                      xAxis={[
                        {
                          data: dates,
                          scaleType: 'band',
                        },
                      ]}
                      yAxis={[
                        {
                          min: 0,
                          max: maxPredict + 1,
                        },
                      ]}
                      series={[
                        {
                          id: 'Aseria',
                          data: targets,
                          label: 'Прогноз',
                          color: '#2FCBFF',
                          area: true,
                          showMark: false,
                          curve: 'natural',
                        },
                      ]}
                      height={252}
                      margin={{ top: 10, right: 30, bottom: 20, left: 33 }}
                      sx={{
                        '& .MuiAreaElement-series-Aseria': {
                          fill: "url('#myGradient')",
                        },
                        '& .MuiChartsAxis-left .MuiChartsAxis-line': {
                          display: 'none',
                        },
                        '& .MuiChartsAxis-bottom .MuiChartsAxis-line': {
                          stroke: '#F0F0F0',
                          strokeWidth: 1,
                        },
                        '& .MuiChartsAxis-tick': {
                          stroke: '#F0F0F0',
                          strokeWidth: 1,
                        },
                        '.MuiChartsLegend-root': {
                          display: 'none',
                        },
                        '.MuiChartsAxis-tickLabel': {
                          fontFamily: 'Futura PT',
                          color: '#4D4D4D',
                          fontSize: '10px',
                        },
                      }}
                    >
                      <defs>
                        <linearGradient
                          id="myGradient"
                          gradientTransform="rotate(90)"
                        >
                          <stop offset="15%" stopColor="#2FCBFF" />
                          <stop
                            offset="100%"
                            stopColor="rgba(47, 203, 255, 0.10)"
                          />
                        </linearGradient>
                      </defs>
                    </LineChart>
                  </LeftDescBlock>
                  <RightDescBlock>
                    <div style={{ marginBottom: '16px' }}>
                      <TitleDesc>Всего:</TitleDesc>
                      <LineDesc>
                        <LineDescLeftPart>Прибыль</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>Потери</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>
                          Точность
                          <br /> прогноза
                        </LineDescLeftPart>
                        <LineDescRightPart style={{ color: 'green' }}>
                          -
                        </LineDescRightPart>
                      </LineDesc>
                    </div>
                    <div>
                      <TitleDesc>В прошлом:</TitleDesc>
                      <LineDesc>
                        <LineDescLeftPart>год</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>месяц</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                      <LineDesc>
                        <LineDescLeftPart>неделя</LineDescLeftPart>
                        <LineDescRightPart>-</LineDescRightPart>
                      </LineDesc>
                    </div>
                  </RightDescBlock>
                </Grid>
              </CustomPaper>
            </Grid>
            <Grid item xs={9}>
              <CustomPaper style={{ padding: '0' }}>
                <TitleGraphBlock
                  style={{ alignItems: 'center', padding: '0 12px', margin: '0' }}
                >
                  <TitleGraph>Фактические и спрогнозированные продажи</TitleGraph>
                </TitleGraphBlock>
                <Box sx={{ height: 400, width: '100%' }}>
                  <DataGrid
                    rows={transformedData}
                    columns={columns}
                    initialState={{
                      pagination: {
                        paginationModel: {
                          pageSize: 5,
                        },
                      },
                    }}
                    pageSizeOptions={[5]}
                    // checkboxSelection
                    disableRowSelectionOnClick
                    sx={{
                      '&.MuiDataGrid-root': {
                        borderRadius: '0',
                        border: 'none',
                      },
                      '& .MuiDataGrid-cell': {
                        // borderBottom: 'none',
                      },
                      '& .MuiDataGrid-columnHeaders': {
                        // backgroundColor: '#F0F0F0',
                        backgroundColor: 'rgba(0,0,0,0.02)',
                      },
                    }}
                  />
                </Box>
              </CustomPaper>
            </Grid>
            <Grid item xs={3}>
              <CustomPaper style={{ padding: '12px' }}>
                <TitleDesc>Спрос на 14 дней:</TitleDesc>
                <LineDesc>
                  <LineDescLeftPart>Прогноз</LineDescLeftPart>
                  <LineDescRightPart>{sumPredict}</LineDescRightPart>
                </LineDesc>
                <LineDesc>
                  <LineDescLeftPart>Остаток</LineDescLeftPart>
                  <LineDescRightPart>-</LineDescRightPart>
                </LineDesc>
                <LineDesc>
                  <LineDescLeftPart>Закупка</LineDescLeftPart>
                  <LineDescRightPart style={{ color: 'green' }}>
                    -
                  </LineDescRightPart>
                </LineDesc>
                <button className={styles.export} onClick={handleExportClick}>
                  Выгрузить
                </button>
                <Dialog open={open} onClose={() => setOpen(false)}>
                  <DialogTitle>Выберите формат выгрузки</DialogTitle>
                  <DialogContent>
                    <DialogContentText>
                      Выберите формат для выгрузки данных:
                    </DialogContentText>
                    <Button onClick={handleExcelExport} color="primary">
                      Выгрузить в Excel
                    </Button>
                    <Button onClick={handleCsvExport} color="primary">
                      Выгрузить в CSV
                    </Button>
                  </DialogContent>
                  <DialogActions>
                    <Button onClick={() => setOpen(false)} color="primary">
                      Отмена
                    </Button>
                  </DialogActions>
                </Dialog>
              </CustomPaper>
            </Grid>
          </Grid>
        </div>
      );
    } else {
      return <></>;
    }
  }
  catch{
    return (
      <Error />
    );
  }
};

export default Statistics;
