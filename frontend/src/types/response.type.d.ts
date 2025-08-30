export interface ContentResponse {
    success: boolean,
    message: string,
    result: {
        _id: string,
        title: string,
        pages: [
            pageNo: number,
            title: string,
            description: string,
            points: string[],
            prompt: string
        ]
    }
    createdAt: Date
    createdBy: string,
    slug: string
}
