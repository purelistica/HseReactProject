export interface User {
    login: string;
    password: string;
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

interface Cart {
    login: string;
    list: number[];
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

        let jsonPromise: Promise<Cart[]> = (response).json();
        let cart: Cart = (await jsonPromise)[0];

        let shopItems = [];

        for (let shopItemId of cart.list) {
            let tmp: SeriesItem[] = await ((await fetch(`${DataService.DB_URL}/shopItem?id=${shopItemId}`)).json());
            let shopItem = tmp[0];
            shopItems.push(shopItem);
        }

        return shopItems;
    }

    /**
     * Добавить новый TodoItem на сервер
     * @param newItem новый TodoItem
     */
    // public async saveItem(newItem: TodoItem): Promise<TodoItem> {
    //     if (this.currentUser == null) {
    //         return Promise.reject("User is not authorized");
    //     }
    //
    //     delete newItem.id;
    //     let postPromise = fetch(`${DataService.DB_URL}/todo`, {
    //         headers: {
    //             'Accept': 'application/json',
    //             'Content-Type': 'application/json'
    //         },
    //         method: "POST",
    //         body: JSON.stringify(newItem)
    //     });
    //     return await (await postPromise).json();
    // }

    /**
     * Удалить TodoItem
     * @param id идентификатор item'a
     * @returns true, если получилось удалить
     */
    public async deleteItem(id: number): Promise<boolean> {
        if (this.currentUser == null) {
            return Promise.reject("User is not authorized");
        }

        let deletePromise = fetch(`${DataService.DB_URL}/todo/${id}`, {
            method: "DELETE"
        });

        return (await deletePromise).ok;
    }

}

let dataService = new DataService();
export default dataService;