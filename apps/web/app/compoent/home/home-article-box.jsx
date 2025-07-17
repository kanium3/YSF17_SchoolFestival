import Link from 'next/link'
import Image from 'next/image'
import { solveBasePath } from '/workspaces/YSF17_SchoolFestival/apps/web/app/lib/index.js'

export default async function Home_articleBox({ data, key }) {
    /**@type {Date}*/
    const date = data.date

    return (
        <Link href={data.link} key={key}>
            <div>
                <div>
                    <p>{data.title}</p>
                    <p>{`${date.getFullYear()}年${date.getMonth() + 1}月${date.getDate()}日投稿`}</p>
                </div>
                <Image src={solveBasePath(data.image ?? '/kari-fallback.png')} alt="特集のイメージ画像" fill={true} />
            </div>
        </Link>
    )
}