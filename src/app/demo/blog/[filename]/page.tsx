import client from '../../../../../tina/__generated__/client'
import Blog from './blog';

type PageProps = {
    params: { filename: string };
    searchParams: {};
}

export default async function Page(props: PageProps) {
    const filename = props.params.filename;
    let variables = { relativePath: `${filename}.md` };
    const tinaData = await client.queries.post(variables)

    return (
        <div>
            <Blog
                data={tinaData.data}
                query={tinaData.query}
                variables={tinaData.variables}
            />
        </div>
    )
}