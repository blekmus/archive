import projects from '../../projects'

export default function handler(req, res) {
    const host = req.headers.host;
    const protocol = req.headers['x-forwarded-proto'] || 'http';
    const domain = `${protocol}://${host}`;

    res.status(200).json(projects.map((project) => {
        project.imgUrl = domain + '/' + project.imgUrl.slice(1)
        return project
    }));
}