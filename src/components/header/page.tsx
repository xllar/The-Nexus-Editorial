import styles from './style.module.scss';
import Header from './header';
import Icon from './navbar';
interface Country{
  name:string,
  flag:string
}
interface PageProps{
  country : Country | null
}
const Page: React.FC<PageProps>=({country})=> {
  return (
  <div>
    <Icon/>
    <Header country ={country}/>
  </div>
  )
}
export default Page;