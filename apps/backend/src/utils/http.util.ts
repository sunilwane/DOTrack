export class HttpError extends Error {
    constructor(public status: number, message: string) {
        super(message);
        this.name = 'HttpError';
    }
}

interface RequestConfig extends RequestInit {
    params?: Record<string, string | number>;
}

export class HttpClient {
    constructor(private baseUrl: string = '', private defaultHeaders: Record<string, string> = {}) { }

    private async request<T>(endpoint: string, config: RequestConfig = {}): Promise<T> {
        const { params, headers, ...rest } = config;
        let url = `${this.baseUrl}${endpoint}`;

        if (params) {
            const searchParams = new URLSearchParams();
            Object.entries(params).forEach(([key, value]) => {
                searchParams.append(key, String(value));
            });
            url += `?${searchParams.toString()}`;
        }

        const response = await fetch(url, {
            headers: {
                'Content-Type': 'application/json',
                ...this.defaultHeaders,
                ...headers,
            },
            ...rest,
        });

        if (!response.ok) {
            throw new HttpError(response.status, `Request to ${url} failed: ${response.statusText}`);
        }

        const text = await response.text();
        return text ? JSON.parse(text) : ({} as T);
    }

    public get<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'GET' });
    }

    public post<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'POST',
            body: JSON.stringify(body),
        });
    }

    public put<T>(endpoint: string, body?: any, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, {
            ...config,
            method: 'PUT',
            body: JSON.stringify(body),
        });
    }

    public delete<T>(endpoint: string, config?: RequestConfig): Promise<T> {
        return this.request<T>(endpoint, { ...config, method: 'DELETE' });
    }
}

export const createGitHubClient = (accessToken: string) => {
    return new HttpClient('https://api.github.com', {
        Authorization: `token ${accessToken}`,
        Accept: 'application/vnd.github.v3+json',
    });
};
