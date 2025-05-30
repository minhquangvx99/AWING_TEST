import UilSearch from '@iconscout/react-unicons/dist/icons/uil-search';
import UilTrashAlt from '@iconscout/react-unicons/dist/icons/uil-trash-alt';
import UilMapMarkerEdit from '@iconscout/react-unicons/dist/icons/uil-map-marker-edit';
import { FormInstance, Form, Tooltip, Input, Table, Modal, Skeleton, Empty, InputNumber } from 'antd';
import { Button } from 'components/buttons/Buttons';
import { Heading } from 'components/heading/Heading';
import { DataTableStyleWrap } from 'components/table/Style';
import { themeColor } from 'config/theme/ThemeVariables';
import { Main, TableWrapper } from 'container/Style';
import { ChangeEvent, FC, ReactNode, Suspense, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { RootState } from 'store/RootReducer';
import { fetchListTreasureHuntPaging, saveTreasureHunt, deleteTreasureHunt, updateTreasureHuntForEdit } from 'store/treasureHunt/Actions';
import { TreasureHuntModel } from 'store/treasureHunt/Types';
import { Route } from '@ant-design/pro-layout/es/typing';
import { Cards } from 'components/cards/frame/CardsFrame';
import moment from 'moment';
interface ITreasureHuntTableData {
  Id?: string;
  key?: number;
  NRow?: ReactNode;
  MColumn?: ReactNode;
  P?: ReactNode;
  Matrix?: ReactNode;
  Path?: ReactNode;
  MinimumFuel?: ReactNode;
  CreatedDate?: ReactNode;
  ModifiedDate?: ReactNode;
  action1?: ReactNode;
  action2?: ReactNode;
}

interface ITreasureHunt { }

const TreasureHuntes: FC<ITreasureHunt> = (props) => {
  const treasureHuntDataPaging = useSelector((states: RootState) => states.treasureHunt.dataPaging);
  const treasureHuntForEdit = useSelector((states: RootState) => states.treasureHunt.treasureHuntForEdit);
  const loading = useSelector((states: RootState) => states.treasureHunt.loading);
  const dispatch = useDispatch<any>();
  const formRef = useRef<FormInstance<any>>(null);
  const [form] = Form.useForm();
  const [state, setState] = useState({
    matrixSearchKey: '',
    modalConfirmVisible: false,
    typeConfirm: 1,
    page: 1,
  });

  useEffect(() => {
    getListTreasureHunt();
  }, [state.page]);

  const getListTreasureHunt = () => {
    let keyWord = state.matrixSearchKey.trim();
    setState({ ...state, matrixSearchKey: keyWord });
    dispatch(fetchListTreasureHuntPaging(state.page, 10, keyWord));
  };

  const onChangePage = (page: number) => {
    setState((state) => ({ ...state, page }));
  };

  const save = (values: any) => {
    let treasureHuntItem = {
      Id: treasureHuntForEdit?.Id,
      NRow: values.rows,
      MColumn: values.cols,
      P: values.p,
      Matrix: values.matrix.map((row: number[]) => row.map((cell: number) => cell))
    };
    dispatch(saveTreasureHunt(treasureHuntItem, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };
  const deleteSolveHistory = () => {
    treasureHuntForEdit?.Id && dispatch(deleteTreasureHunt(treasureHuntForEdit?.Id, state.page));
    !loading && closeModalConfirm();
    setState((state) => ({ ...state, searchKey: '', page: 1 }));
  };

  const onChangeSearchBar = (e: ChangeEvent<HTMLInputElement>) => {
    setState({ ...state, matrixSearchKey: e.currentTarget.value });
  };

  const [rows, setRows] = useState(0);
  const [cols, setCols] = useState(0);
  const [p, setP] = useState(0);

  const filter = () => {
    if (state.page === 1) {
      getListTreasureHunt();
    } else {
      setState((state) => ({ ...state, page: 1 }));
    }
  };

  const dataTableColumn = [
    {
      title: () => {
        return (
          <div style={{ textAlign: 'center' }}>
            <div style={{ fontWeight: 550 }}>Id</div>
          </div>
        );
      },
      dataIndex: 'Id',
      key: 'Id',
      align: 'center' as const,
      width: '5vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>NRow</div>;
      },
      dataIndex: 'NRow',
      align: 'center' as const,
      key: 'NRow',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>MColumn</div>;
      },
      dataIndex: 'MColumn',
      align: 'center' as const,
      key: 'MColumn',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>P</div>;
      },
      dataIndex: 'P',
      align: 'center' as const,
      key: 'P',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Matrix</div>;
      },
      dataIndex: 'Matrix',
      align: 'center' as const,
      key: 'Matrix',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>MinimumFuel</div>;
      },
      dataIndex: 'MinimumFuel',
      align: 'center' as const,
      key: 'MinimumFuel',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>Path</div>;
      },
      dataIndex: 'Path',
      align: 'center' as const,
      key: 'Path',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>CreatedDate</div>;
      },
      dataIndex: 'CreatedDate',
      align: 'center' as const,
      key: 'CreatedDate',
      width: '85vw',
    },
    {
      title: () => {
        return <div style={{ fontWeight: 550, textAlign: 'center' }}>ModifiedDate</div>;
      },
      dataIndex: 'ModifiedDate',
      align: 'center' as const,
      key: 'ModifiedDate',
      width: '85vw',
    },
    {
      title: '',
      dataIndex: 'action1',
      key: 'action1',
      width: '5vw',
    },
    {
      title: '',
      dataIndex: 'action2',
      key: 'action2',
      width: '5vw',
    },
  ];

  let tableDataSource: ITreasureHuntTableData[] = [];
  treasureHuntDataPaging?.listSolveHistory?.map((item) => {
    const { Id, NRow, MColumn, P, Matrix, Path, MinimumFuel, CreatedDate, ModifiedDate } = item;
    return tableDataSource.push({
      key: Id,
      Id: `${Id}`,
      NRow: (
        <pre className="custom-pre">{NRow}</pre>
      ),
      MColumn: (
        <pre className="custom-pre">{MColumn}</pre>
      ),
      P: (
        <pre className="custom-pre">{P}</pre>
      ),
      Matrix: (
        <pre className="custom-pre" title={Matrix || ''}>
          {Matrix ? (Matrix.length > 40 ? `${Matrix.slice(0, 40)}...` : Matrix) : <span style={{ color: '#aaa' }}></span>}
        </pre>
      ),
      Path: (
        <pre className="custom-pre" title={Path || ''}>
          {Path ? (Path.length > 15 ? `${Path.slice(0, 15)}...` : Path) : <span style={{ color: '#aaa' }}></span>}
        </pre>
      ),
      MinimumFuel: (
        <pre className="custom-pre">{MinimumFuel}</pre>
      ),
      CreatedDate: (
        <pre className="custom-pre">{moment(CreatedDate).format('HH:mm DD-MM-YYYY')}</pre>
      ),
      ModifiedDate: (
        <pre className="custom-pre">{ModifiedDate ? moment(ModifiedDate).format('HH:mm DD-MM-YYYY') : ''}</pre>
      ),
      action1: (
        <div className="table-actions">
          <Tooltip title={'Giải lại'}>
            <Link
              className="edit"
              to="#"
              onClick={() => openModalConfirm(1, item)}
            >
              <UilMapMarkerEdit style={{ width: 20 }} color={themeColor['success-color']} />
            </Link>
          </Tooltip>
        </div>
      ),
      action2: (
        <div className="table-actions">
          <Tooltip title={'Xóa'}>
            <Link
              className="delete"
              to="#"
              onClick={() => openModalConfirm(2, item)}
            >
              <UilTrashAlt style={{ width: 24 }} color={themeColor['danger-color']} />
            </Link>
          </Tooltip>
        </div>
      ),
    });
  });

  useEffect(() => {
    state.typeConfirm === 1 &&
      formRef.current?.setFieldsValue({
        rows: treasureHuntForEdit?.NRow || 0,
        cols: treasureHuntForEdit?.MColumn || 0,
        p: treasureHuntForEdit?.P || 0,
        matrix: treasureHuntForEdit?.Matrix ? JSON.parse(treasureHuntForEdit.Matrix) : [],
      });
    setCols(treasureHuntForEdit?.MColumn || 0);
    setRows(treasureHuntForEdit?.NRow || 0);
    setP(treasureHuntForEdit?.P || 0);

    state.typeConfirm === 2 &&
      formRef.current?.setFieldsValue({
        rows: 0,
        cols: 0,
        p: 0,
        matrix: [],
      });
  }, [treasureHuntForEdit, state.typeConfirm]);

  const openModalConfirm = (typeConfirm: number, treasureHunt: TreasureHuntModel) => {
    dispatch(
      updateTreasureHuntForEdit(
        treasureHunt,
        setState((state) => ({ ...state, modalConfirmVisible: true, typeConfirm })),
      ),
    );
  };

  const closeModalConfirm = () => {
    setState((state) => ({ ...state, modalConfirmVisible: false }));
  };

  const onSubmit = async () => {
    if (state.typeConfirm === 1) {
      try {
        const values = await formRef.current?.validateFields();
        const matrix = values.matrix;
        const p = values.p;
        const flat = matrix.flat();

        const expected = new Set(Array.from({ length: p }, (_, i) => i + 1));

        for (const num of flat) {
          expected.delete(num);
        }

        if (expected.size > 0) {
          const missing = Array.from(expected).join(', ');
          Modal.error({
            title: 'Không tìm được kho báu',
            content: `Do ma trận chưa chứa đủ các số từ 1 đến ${p} (p). Thiếu: ${missing}.`,
          });
          return;
        }
        save(values);
      } catch (errorInfo) {
        console.log('Validate Failed:', errorInfo);
      }
    } else {
      deleteSolveHistory();
    }
  };

  return (
    <div>
      <Main>
        <Suspense
          fallback={
            <Cards headless>
              <Skeleton active />
            </Cards>
          }
        >
          <Cards border>
            <DataTableStyleWrap>
              {/* Filter side */}
              <div className="ninjadash-datatable-filter">
                <div className="ninjadash-datatable-filter__left">
                  <div className="ninjadash-datatable-filter__input" style={{ minWidth: '50%' }}>
                    <Input
                      className="ninjadash-data-id"
                      value={state.matrixSearchKey}
                      allowClear
                      onChange={onChangeSearchBar}
                      onPressEnter={filter}
                      placeholder='Nhập đẩy đủ ma trận theo định dạng: [[1,2,3],[4,5,6],[7,8,9]]'
                      prefix={<UilSearch style={{ color: 'black' }} onClick={filter} />}
                    />
                  </div>
                </div>
                <div className="ninjadash-datatable-filter__action" style={{ display: 'flex' }}>
                  <Button
                    style={{ width: 130 }}
                    mergetype="dark-success"
                    onClick={() => openModalConfirm(1, {} as TreasureHuntModel)}
                  >
                    Tìm kho báu
                  </Button>
                </div>
              </div>

              <div className="ninjadasj-datatable">
                <TableWrapper className="table-data-view table-responsive">
                  <Table
                    bordered
                    className="table-responsive"
                    dataSource={tableDataSource}
                    columns={dataTableColumn}
                    pagination={
                      tableDataSource.length > 0 && {
                        pageSize: 10,
                        onChange: onChangePage,
                        total: treasureHuntDataPaging?.totalRow,
                        current: state.page,
                      }
                    }
                    loading={loading}
                    locale={{
                      emptyText: (
                        <Empty
                          image={Empty.PRESENTED_IMAGE_SIMPLE}
                          description={state.matrixSearchKey.trim() !== '' ? 'Not found' : 'No data'}
                        />
                      ),
                    }}
                  />
                </TableWrapper>
              </div>
            </DataTableStyleWrap>
          </Cards>
        </Suspense>
      </Main>

      <Modal
        closable={false}
        centered
        open={state.modalConfirmVisible}
        // onCancel={closeModalConfirm}
        footer={
          <div style={{ display: 'flex', justifyContent: 'center' }}>
            <Button mergetype="primary" outlined key="back" onClick={closeModalConfirm}>
              {state.typeConfirm === 1 ? 'Cancel' : 'No'}
            </Button>
            ,
            <Button
              loading={loading}
              mergetype="primary"
              key="submit"
              onClick={onSubmit}
            >
              {state.typeConfirm === 1 ? 'Solve' : 'Yes'}
            </Button>
            ,
          </div>
        }
      >
        <div style={{ justifyItems: 'center', display: 'grid', marginBottom: 20 }}>
          <Heading as="h4">
            {state.typeConfirm === 1 ? 'Tìm kho báu' : 'Are you sure you want to delete the item?'}
          </Heading>
        </div>

        <Form
          hidden={state.typeConfirm === 1 ? false : true}
          form={form}
          ref={formRef}
          name="ninjadash-vertical-form"
          layout="vertical"
        >
          <Form.Item
            label="Số hàng (n)"
            name="rows"
            rules={[
              { required: true, message: 'Nhập số hàng' },
              {
                type: 'number',
                min: 1,
                max: 500,
                message: 'n phải từ 1 đến 500',
              },
            ]}
          >
            <InputNumber
              value={rows}
              onChange={(val) => {
                if (typeof val === 'number') {
                  setRows(val);
                  form.setFieldValue('rows', val);
                }
              }}
              controls={false}
            />
          </Form.Item>

          <Form.Item
            label="Số cột (m)"
            name="cols"
            rules={[
              { required: true, message: 'Nhập số cột' },
              {
                type: 'number',
                min: 1,
                max: 500,
                message: 'm phải từ 1 đến 500',
              },
            ]}
          >
            <InputNumber
              value={cols}
              onChange={(val) => {
                if (typeof val === 'number') {
                  setCols(val);
                  form.setFieldValue('cols', val);
                }
              }}
              controls={false}
            />
          </Form.Item>

          <Form.Item
            label="Giá trị kho báu (p)"
            name="p"
            rules={[
              { required: true, message: 'Nhập giá trị p' },
              {
                type: 'number',
                min: 1,
                max: rows * cols,
                message: `p phải từ 1 đến ${rows * cols} (n*m)`,
              },
            ]}
          >
            <InputNumber
              value={p}
              onChange={(val) => {
                if (typeof val === 'number') {
                  setP(val);
                  form.setFieldValue('p', val);
                }
              }}
              controls={false}
            />
          </Form.Item>

          {rows > 0 && cols > 0 && (
            <>
              <h4>Nhập ma trận ({rows} hàng × {cols} cột):</h4>
              <div
                style={{
                  maxHeight: '400px',
                  maxWidth: '100%',
                  overflow: 'auto',
                  border: '1px solid #eee',
                  padding: '8px',
                }}
              >
                <div
                  style={{
                    display: 'grid',
                    gridTemplateColumns: `repeat(${cols}, minmax(60px, 1fr))`,
                    gap: '8px',
                    minWidth: cols * 60,
                  }}
                >
                  {Array.from({ length: rows }).map((_, i) =>
                    Array.from({ length: cols }).map((_, j) => (
                      <Form.Item
                        key={`matrix-${i}-${j}`}
                        name={['matrix', i, j]}
                        rules={[
                          { required: true, message: 'Bắt buộc nhập' },
                          {
                            type: 'number',
                            min: 1,
                            max: p,
                            message: `Giá trị phải từ 1 đến ${p} (p)`,
                          },
                        ]}
                        style={{ marginBottom: 0 }}
                      >
                        <InputNumber
                          style={{ width: '100%' }}
                          controls={false}
                        />
                      </Form.Item>
                    ))
                  )}
                </div>
              </div>
            </>
          )}
        </Form>
      </Modal>
    </div>
  );
};

export default TreasureHuntes;
