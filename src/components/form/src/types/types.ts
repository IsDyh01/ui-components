import { RuleItem } from "./rule";
import { CSSProperties } from "vue";

//表单项的类型
export interface FormOptions {
  // 表单项显示的元素
  type:
    | "cascader"
    | "checkbox"
    | "checkbox-group"
    | "checkbox-button"
    | "color-picker"
    | "date-picker"
    | "input"
    | "input-number"
    | "radio"
    | "radio-group"
    | "radio-button"
    | "rate"
    | "select"
    | "option"
    | "slider"
    | "switch"
    | "time-picker"
    | "time-select"
    | "transfer"
    | "upload"
    | "editor";
  // 表单项的值
  value?: any;
  // 表单项label
  label?: string;
  // 表单项的标识,大的form与其内部表单项的关联就是通过prop属性
  prop?: string;
  // 表单项的验证规则
  rules?: RuleItem[];
  // 表单项的占位符
  placeholder?: string;
  // 表单元素特有的属性,可以在渲染内部表单元素时通过v-bind='item.attrs'来绑定，支持与element-plus同样的配置属性
  attrs?: {
    clearable?: boolean;
    showPassword?: boolean;
    disabled?: boolean;
    // 类型，如password等
    type?: string;
    //表单项的css样式
    style?: CSSProperties;
  };
  //因为表单项可能不单单只有一个组件，也可能还会有子组件如select框下边还有options，因此需要children
  children?: FormOptions[];
  // 处理上传组件的属性和方法
  uploadAttrs?: {
    action: string;
    headers?: object;
    method?: "post" | "put" | "patch";
    multiple?: boolean;
    data?: any;
    name?: string;
    withCredentials?: boolean;
    showFileList?: boolean;
    drag?: boolean;
    accept?: string;
    thumbnailMode?: boolean;
    fileList?: any[];
    listType?: "text" | "picture" | "picture-card";
    autoUpload?: boolean;
    disabled?: boolean;
    limit?: number;
  };
}
