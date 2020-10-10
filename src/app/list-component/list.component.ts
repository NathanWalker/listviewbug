import { Component, OnInit } from "@angular/core";
import { EventData } from "@nativescript/core";
import { ListViewEventData } from "nativescript-ui-listview";

export interface ListItem {
    title: string;
    random: number;
    group: string;
    swipeable: boolean;
}

@Component({
    selector: "ns-list",
    templateUrl: "./list.component.html",
})
export class ListComponent implements OnInit {
    public _itemsArray: Array<ListItem>;
    //////////////////////////////////////////////////////////////////////////////////////////////////
    constructor() {}

    //////////////////////////////////////////////////////////////////////////////////////////////////
    ngOnInit(): void {
        this.createItems();
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    public onButtonPressed() {
        this.createItems();
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    private createItems() {
        this._itemsArray = new Array<ListItem>();

        for (let i = 0; i < 10; ++i) {
            const rand = Math.floor(Math.random() * Math.floor(100));

            this._itemsArray.push({
                title: "item " + i,
                random: rand,
                group: i % 2 ? "Group A" : "Group B",
                swipeable: i % 4 ? true : false,
            });
        }
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    public groupingFunction(item: ListItem): any {
        return item.group;
    }

    //////////////////////////////////////////////////////////////////////////////////////////////////
    public sortingFunc(item1: ListItem, item2: ListItem) {
        let retVal = 0;
        // for items of same meal we sort by oldest item (smalest id) first
        if (item1.random > item2.random) {
            retVal = -1;
        } else if (item1.random < item2.random) {
            retVal = 1;
        }
        return retVal;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    public templateSelector = (item: ListItem, index: number, items: any) => {
        let retVal = "itemTemplate";
        if (!item.swipeable) {
            retVal = "itemNotSwipableTemplate";
        }
        return retVal;
    };

    //////////////////////////////////////////////////////////////////////////////////////////////////
    public onItemSwiping(args: ListViewEventData) {
        console.log("Current index is:" + args.index);

        const selectedItem = this._itemsArray[args.index];
        console.log(
            "item: " +
                selectedItem.title +
                " swipeable = " +
                selectedItem.swipeable
        );
        args.returnValue = selectedItem.swipeable;
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    public onCellSwiping(args: ListViewEventData) {}
    //////////////////////////////////////////////////////////////////////////////////////////////////
    public onSwipeCellStarted(args: ListViewEventData) {
        const swipeLimits = args.data.swipeLimits;
        swipeLimits.threshold = args["mainView"].getMeasuredWidth() * 0.1; // 10% of whole width
        swipeLimits.left = 0;
        swipeLimits.right = args["mainView"].getMeasuredWidth() * 0.2; // 25% of whole width
    }
    //////////////////////////////////////////////////////////////////////////////////////////////////
    public onDeleteButtonClicked(args: EventData) {}
}
