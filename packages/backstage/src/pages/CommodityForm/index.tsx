import { Button, Card, Form, message, Upload } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
} from '@ant-design/pro-form';
import { connect, useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import React from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import FormItem from 'antd/lib/form/FormItem';
import { UploadOutlined } from '@ant-design/icons';
import { ConnectState } from '@/models/connect';
import { CommodityParamsType } from '@/services/commodity';
import { fakeUploadImage } from '@/services/file';

const formats = [
  "header",
  "bold",
  "italic",
  "underline",
  "strike",
  "blockquote",
  "list",
  "bullet",
  "indent",
  "link",
  "image",
  "imageBlot" // #5 Optinal if using custom formats
];

const uploadProps = {
  maxCount: 1,
  listType: "picture",
  beforeUpload(file: any) {
    console.log(file)
  },
  onChange(info: any) {
    console.log(info.fileList);
  },
  accept: ".jpg, .png",
};


const CommodityForm: FC<Record<string, any>> = (props) => {
  const [quillRef, setQuillRef] = React.useState<any>({})
  const handleSubmit = (values: CommodityParamsType) => {
    const { dispatch } = props;
    dispatch({
      type: 'commodity/upload',
      payload: {
        title: values.title,
        type: values.type,
        content: quillRef.state.value,
        previewImage: values.previewImage,
        basicPrice: values.basicPrice
      },
    });
  };

  const onFinish = async (values: Record<string, any>) => {
    console.log(values, quillRef);
    handleSubmit(values as CommodityParamsType);
    return Promise.resolve();
  };


  const imageHandler = (v: any) => {
    const input = document.createElement('input') as any;

    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      var file: any = input.files[0];
      var formData = new FormData();

      formData.append('image', file);

      console.log(file);
      const dd = await fakeUploadImage(file);
      const fileUrl = dd.host + '/' + dd.path;
      console.log(quillRef);
      const quill = quillRef.getEditor();
      const oldHtml = quill.root;
      console.log(oldHtml);
      const img = document.createElement('img');
      img.src = fileUrl;
      oldHtml.appendChild(img);
    };
  }


  const modules = {
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
        ['bold', 'italic', 'underline'],
        [{ 'list': 'ordered' }, { 'list': 'bullet' }],
        [{ 'align': [] }],
        ['link', 'image'],
        ['clean'],
        [{ 'color': [] }]
      ],
      handlers: {
        image: imageHandler
      }
    }
  };


  return (
    <PageContainer content="表单页用于向用户收集或验证信息，基础表单常见于数据项较少的表单场景。">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >

          <FormItem
            // {...formItemLayout}
            label="預覽圖"
            name="previewImage"
            rules={[
              {
                required: false,
                // message: formatMessage({ id: 'apntokenform.title.required' }),
              },
            ]}
          >
            <Upload {...uploadProps}>
              <Button icon={<UploadOutlined />}>Click to Upload (jpg, png)</Button>
            </Upload>
          </FormItem>
          <ProFormText
            width="md"
            label="标题"
            name="title"
            rules={[
              {
                required: true,
                message: '请输入标题',
              },
            ]}
            placeholder="给目标起个名字"
          />
          <ProFormSelect
            options={[
              {
                value: 'ITEM',
                label: '物品',
              },
              {
                value: 'WEAPON',
                label: '武器',
              },
              {
                value: 'ARMOR',
                label: '裝備',
              },
            ]}
            width="md"
            initialValue='ITEM'
            label="商品分類"
            name="type"
          />
          <ProFormDigit
            width="md"
            label="價格"
            name="basicPrice"
            initialValue={0}
            rules={[
              {
                required: true,
                message: '请输入價格',
              },
            ]}
          />
          <ReactQuill
            ref={el => {
              setQuillRef(el);
            }}
            modules={modules}
            formats={formats}
          >
            <div className="my-editing-area" />
          </ReactQuill>

          {/* <ProFormDateRangePicker
            label="起止日期"
            width="md"
            name="date"
            rules={[
              {
                required: true,
                message: '请选择起止日期',
              },
            ]}
            placeholder={['开始日期', '结束日期']}
          /> */}
          {/* <ProFormText
            width="md"
            label={
              <span>
                邀评人
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            name="invites"
            placeholder="请直接 @姓名／工号，最多可邀请 5 人"
          /> */}

          {/* <ProFormDigit
            label={
              <span>
                权重
                <em className={styles.optional}>（选填）</em>
              </span>
            }
            name="weight"
            placeholder="请输入"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value ? value.replace('%', '') : '0'),
            }}
          /> */}

          {/* <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: '公开',
              },
              {
                value: '2',
                label: '部分公开',
              },
              {
                value: '3',
                label: '不公开',
              },
            ]}
            label="目标公开"
            help="客户、邀评人默认被分享"
            name="publicType"
          /> */}
          <ProFormDependency name={['publicType']}>
            {({ publicType }) => {
              return (
                <ProFormSelect
                  width="md"
                  name="publicUsers"
                  fieldProps={{
                    style: {
                      margin: '8px 0',
                      display: publicType && publicType === '2' ? 'block' : 'none',
                    },
                  }}
                  options={[
                    {
                      value: '1',
                      label: '同事甲',
                    },
                    {
                      value: '2',
                      label: '同事乙',
                    },
                    {
                      value: '3',
                      label: '同事丙',
                    },
                  ]}
                />
              );
            }}
          </ProFormDependency>
        </ProForm>
      </Card>
    </PageContainer>
  );
};

export default connect(({ loading }: ConnectState) => ({
  submitting: loading.effects['commodity/upload'],
}))(CommodityForm);