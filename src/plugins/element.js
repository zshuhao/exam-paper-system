import Vue from 'vue'
import {
    Button,
    Container,
    Header,
    Aside,
    Main,
    Row,
    Col,
    Menu,
    MenuItem,
    Submenu,
    Dropdown,
    DropdownMenu,
    DropdownItem,
    Form,
    FormItem,
    Input,
    Select,
    Option,
    ButtonGroup,
    Table,
    TableColumn,
    Dialog,
    Pagination,
    MessageBox,
    Message,
    Loading
} from 'element-ui'

// Vue.prototype.$ELEMENT = { size: 'small', zIndex: 3000 }

Vue.use(Button)
Vue.use(Container)
Vue.use(Header)
Vue.use(Aside)
Vue.use(Main)
Vue.use(Row)
Vue.use(Col)
Vue.use(Menu)
Vue.use(MenuItem)
Vue.use(Submenu)
Vue.use(Dropdown)
Vue.use(DropdownMenu)
Vue.use(DropdownItem)
Vue.use(Form)
Vue.use(FormItem)
Vue.use(Input)
Vue.use(Select)
Vue.use(Option)
Vue.use(ButtonGroup)
Vue.use(Table)
Vue.use(TableColumn)
Vue.use(Dialog)
Vue.use(Pagination)
Vue.use(Loading.directive)

Vue.prototype.$msgbox = MessageBox
Vue.prototype.$alert = MessageBox.alert
Vue.prototype.$confirm = MessageBox.confirm
Vue.prototype.$prompt = MessageBox.prompt
Vue.prototype.$message = Message
