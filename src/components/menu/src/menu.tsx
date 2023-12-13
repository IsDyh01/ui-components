import { defineComponent, PropType, useAttrs } from "vue";

import "./style/index.scss";

import { MenuItemType } from "./types";

import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import { useRouter } from "vue-router";

//使用tsx进行递归渲染菜单，tsx/jsx只能使用export default方式导出组件
export default defineComponent({
  props: {
    data: {
      type: Array as PropType<MenuItemType[]>,
      required: true,
    },
    defaultActive: {
      type: String,
      default: "",
    },
  },
  setup(props, ctx) {
    const router = useRouter();
    //传递给该组件且未在props中绑定的属性
    const attrs = useAttrs();

    // 菜单的点击事件
    const menuItemClick = (item: any) => {
      router.push({
        path: item.index,
      });
    };

    //递归渲染菜单,返回一段tsx代码
    const renderMenu = (data: MenuItemType[]) => {
      return data.map((item: any) => {
        //处理图标
        item.i = (ElementPlusIconsVue as any)[item.icon];

        //处理插槽，如果item有孩子菜单，就需要处理一个插槽，插入到sub-menu组件中
        const slots = {
          title: () => {
            return (
              <>
                {/* <item.i /> */}
                <span>{item.title}</span>
              </>
            );
          },
        };

        if (item.children && item.children.length > 0) {
          // jsx中通过v-slots向子组件传递插槽
          return (
            <el-sub-menu index={item.index}>
              {{
                title: () => slots.title(),
                default: () => renderMenu(item.children),
              }}
            </el-sub-menu>
          );
        } else {
          return (
            <el-menu-item index={item.index} onClick={menuItemClick}>
              {/* <item.i /> */}
              <span>{item.title}</span>
            </el-menu-item>
          );
        }
      });
    };

    //

    //返回渲染函数，渲染函数返回vnode --> 使用jsx形式的vnode
    return () => {
      return (
        <el-menu
          class="el-menu-vertical-demo"
          default-active={props.defaultActive}
          {...attrs}
        >
          {renderMenu(props.data)}
        </el-menu>
      );
    };
  },
});
