export interface User {
    login: string;
    password: string;
    id: number;
}

export class SeriesItem {

    id: number;
    name: string;
    image: string;
    rating: number;
    description: string;
    link: string;
    years: String[];
    genre: string;

    constructor(id: number, name: string, image: string, rating: number, description: string,
                link: string, years: String[], genre: string) {
        this.id = id;
        this.name = name;
        this.image = image;
        this.rating = rating;
        this.description = description;
        this.link = link;
        this.years = years;
        this.genre = genre;
    }

}

interface Bookmark {
    login: string;
    list: number[];
    id: number;
}

export class BookmarkItem {

    login: string;
    list: number[];
    id: number;

    constructor(login: string, list: number[], id: number) {
        this.login = login;
        this.id = id;
        this.list = list;
    }

}

// Класс для работы с сервером
class DataService {

    private static DB_URL = "http://localhost:4000";

    public currentUser: User | null;

    constructor() {
        this.currentUser = null;
    }

    /**
     * Авторизован ли пользователь?
     */
    public isUserAuthorized() {
        return this.currentUser != null;
    }

    /**
     * Авторизация
     * @param userLogin логин
     * @param password пароль
     */
    public async login(userLogin: string, password: string) {
        let userResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/user`);

        let response: Response = await userResponsePromise;

        let jsonPromise: Promise<User[]> = (response).json();

        let users: User[] = await jsonPromise;

        let foundUsers = users.filter(value => {
            return value.login === userLogin;
        });

        if (foundUsers.length === 0) {
            this.currentUser = null;
            return;
        }

        let foundUser = foundUsers[0];

        if (foundUser.password === password) {
            this.currentUser = foundUser;
            return;
        }
        this.currentUser = null;
    }

    /**
     * Получить все ShopItem'ы пользователя
     */
    public async getSeriesItems(filter: string = ".*"): Promise<SeriesItem[]> {
        // if (this.currentUser == null) {
        //     return Promise.reject("User is not authorized");
        // }

        let todoResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/shopItem?name_like=${filter}`);

        let response: Response = await todoResponsePromise;

        let jsonPromise: Promise<SeriesItem[]> = (response).json();

        return await jsonPromise;
    }


    public async getSeries(item: string): Promise<SeriesItem[]> {
        let cartResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/shopItem?id=${item}`);
        let response: Response = await cartResponsePromise;

        let jsonPromise: Promise<SeriesItem[]> = (response).json();

        return (await jsonPromise);
    }


    public async getCart(): Promise<SeriesItem[]> {
        let cartResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/bookmarks?login=admin`);
        let response: Response = await cartResponsePromise;

        let jsonPromise: Promise<Bookmark[]> = (response).json();
        let cart: Bookmark = (await jsonPromise)[0];

        let shopItems = [];

        for (let shopItemId of cart.list) {
            let tmp: SeriesItem[] = await ((await fetch(`${DataService.DB_URL}/shopItem?id=${shopItemId}`)).json());
            let shopItem = tmp[0];
            shopItems.push(shopItem);
        }

        return shopItems;
    }

    public async getBookmarks(): Promise<BookmarkItem> {
        console.log('getBookmarks()');
        let cartResponsePromise: Promise<Response> = fetch(`${DataService.DB_URL}/bookmarks?id=1`);
        let response: Response = await cartResponsePromise;

        let jsonPromise: Promise<BookmarkItem[]> = (response).json();
        let cart: BookmarkItem = (await jsonPromise)[0];

        return cart;
    }


    public async updateBookmarks(newItem: BookmarkItem): Promise<boolean> {
        // if (this.currentUser == null) {
        //     return Promise.reject("User is not authorized");
        // }

        let postPromise = fetch(`${DataService.DB_URL}/bookmarks?login=admin`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify(newItem)
        });
        return (await postPromise).ok;
    }

    public async deleteItem(id: number): Promise<boolean> {
        // if (this.currentUser == null) {
        //     return Promise.reject("User is not authorized");
        // }

        let deletePromise = fetch(`${DataService.DB_URL}/bookmarks/1`, {
            method: "DELETE"
        });

        return (await deletePromise).ok;
    }

}

let dataService = new DataService();
export default dataService;