import { Card, message } from 'antd';
import ProForm, {
  ProFormDateRangePicker,
  ProFormDependency,
  ProFormDigit,
  ProFormRadio,
  ProFormSelect,
  ProFormText,
  ProFormTextArea,
} from '@ant-design/pro-form';
import { useRequest } from 'umi';
import type { FC } from 'react';
import { PageContainer } from '@ant-design/pro-layout';
import { fakeSubmitForm } from './service';
import styles from './style.less';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import React from 'react';



const createElement = () => {
  const div = document.createElement("div");
  return div;
};

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

const CommodityForm: FC<Record<string, any>> = () => {
  const [quillRef, setQuillRef] = React.useState<any>({})
  const [desc, setDesc] = React.useState<string>('')
  const { run } = useRequest(fakeSubmitForm, {
    manual: true,
    onSuccess: () => {
      message.success('ζδΊ€ζε');
    },
  });

  const onFinish = async (values: Record<string, any>) => {
    run(values);
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

      var fileName = file.name;
      console.log(file);
      console.log(quillRef);
      const quill = quillRef.getEditor();
      const oldHtml = quill.root;
      console.log(oldHtml);
      const img = document.createElement('img');
      img.src = `https://s3.ap-northeast-1.amazonaws.com/persistence.biatalk.cc/Business/setshowbiz/menu/menu_20220721.jpg`;
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
    <PageContainer content="θ‘¨ει‘΅η¨δΊεη¨ζ·ζΆιζιͺθ―δΏ‘ζ―οΌεΊη‘θ‘¨εεΈΈθ§δΊζ°ζ?ι‘ΉθΎε°ηθ‘¨εεΊζ―γ">
      <Card bordered={false}>
        <ProForm
          hideRequiredMark
          style={{ margin: 'auto', marginTop: 8, maxWidth: 600 }}
          name="basic"
          layout="vertical"
          initialValues={{ public: '1' }}
          onFinish={onFinish}
        >
          <ReactQuill
            ref={el => {
              setQuillRef(el);
            }}
            modules={modules}
            formats={formats}
            value={desc}
          >
            <div className="my-editing-area" />
          </ReactQuill>
          <ProFormText
            width="md"
            label="ζ ι’"
            name="title"
            rules={[
              {
                required: true,
                message: 'θ―·θΎε₯ζ ι’',
              },
            ]}
            placeholder="η»η?ζ θ΅·δΈͺεε­"
          />
          <ProFormDateRangePicker
            label="θ΅·ζ­’ζ₯ζ"
            width="md"
            name="date"
            rules={[
              {
                required: true,
                message: 'θ―·ιζ©θ΅·ζ­’ζ₯ζ',
              },
            ]}
            placeholder={['εΌε§ζ₯ζ', 'η»ζζ₯ζ']}
          />
          <ProFormTextArea
            label="η?ζ ζθΏ°"
            width="xl"
            name="goal"
            rules={[
              {
                required: true,
                message: 'θ―·θΎε₯η?ζ ζθΏ°',
              },
            ]}
            placeholder="θ―·θΎε₯δ½ ηιΆζ?΅ζ§ε·₯δ½η?ζ "
          />

          <ProFormTextArea
            label="θ‘‘ιζ ε"
            name="standard"
            width="xl"
            rules={[
              {
                required: true,
                message: 'θ―·θΎε₯θ‘‘ιζ ε',
              },
            ]}
            placeholder="θ―·θΎε₯θ‘‘ιζ ε"
          />

          <ProFormText
            width="md"
            label={
              <span>
                ε?’ζ·
                <em className={styles.optional}>οΌιε‘«οΌ</em>
              </span>
            }
            tooltip="η?ζ ηζε‘ε―Ήθ±‘"
            name="client"
            placeholder="θ―·ζθΏ°δ½ ζε‘ηε?’ζ·οΌει¨ε?’ζ·η΄ζ₯ @ε§εοΌε·₯ε·"
          />

          <ProFormText
            width="md"
            label={
              <span>
                ιθ―δΊΊ
                <em className={styles.optional}>οΌιε‘«οΌ</em>
              </span>
            }
            name="invites"
            placeholder="θ―·η΄ζ₯ @ε§εοΌε·₯ε·οΌζε€ε―ιθ―· 5 δΊΊ"
          />

          <ProFormDigit
            label={
              <span>
                ζι
                <em className={styles.optional}>οΌιε‘«οΌ</em>
              </span>
            }
            name="weight"
            placeholder="θ―·θΎε₯"
            min={0}
            max={100}
            width="xs"
            fieldProps={{
              formatter: (value) => `${value || 0}%`,
              parser: (value) => (value ? value.replace('%', '') : '0'),
            }}
          />

          <ProFormRadio.Group
            options={[
              {
                value: '1',
                label: 'ε¬εΌ',
              },
              {
                value: '2',
                label: 'ι¨εε¬εΌ',
              },
              {
                value: '3',
                label: 'δΈε¬εΌ',
              },
            ]}
            label="η?ζ ε¬εΌ"
            help="ε?’ζ·γιθ―δΊΊι»θ?€θ’«εδΊ«"
            name="publicType"
          />
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
                      label: 'εδΊη²',
                    },
                    {
                      value: '2',
                      label: 'εδΊδΉ',
                    },
                    {
                      value: '3',
                      label: 'εδΊδΈ',
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

export default CommodityForm;
