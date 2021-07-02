// Here I connact My GitHub Repo use GitHub Api to [CRUD] users tickets
// Go to this link to learn how to Create GitHub Token 
// https://docs.github.com/en/github/authenticating-to-github/keeping-your-account-and-data-secure/creating-a-personal-access-token
import axios from 'axios';
const api = "https://api.github.com/repos/YourUsername/YourRepoName/contents/YourJsonFileFullName";
const token = "token YourGithubToken";
axios.defaults.headers.common['Authorization'] = token;



export const get_sha = async () => {
    return await axios.get(api).then(res => {
        return res.data.sha
    }).catch(() => {
        return []
    })
}

export const update_users = async data => {
    await get_sha();
    var content = {
        message: "Update New user ...",
        content: new Buffer.from(JSON.stringify(data)).toString('base64'),
        sha: await get_sha()
    }
    const config = {
        headers: {
            'Authorization': token,
            'Content-Type': 'application/json',
            'accept': 'application/vnd.github.v3+json'
        }
    };
    const res = await axios.put(api, content, config);
    return res.status == 200 ? 1 : 0;
}

export const get_data = async () => {
    const config = { headers: { 'Authorization': token } };
    const res = await axios.get(api, config);
    return JSON.parse(Buffer.from(res.data['content'], 'base64').toString('ascii'));
}
