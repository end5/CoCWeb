/*
    AddItem
        if item can be added
            add item
        else
            return left over items

    AskUser - character, itemList, nextMenu
        options:
            replace item in inventory
            if (reverseAction)
                PutBack()
            UseNow(character, itemList)
            Abandon()

    PutBack - otherInventory
        reverseAction()
        reverseAction = undefined
        display other inventory

    UseNow - character, itemList
        item = itemList[0]
        item.use(character)
        item.useText(character)
        reverseAction = undefined
        DestroyItem()

    Abandon - itemList, nextMenu
        DestroyItem(itemList, nextMenu)

    DestroyItem - itemList, nextMenu
        itemList[0].quantity--
        if item.quantity <= 0
            itemList.shift()
        if itemList.length > 0
            AskUser()
        else
            NextMenu(nextMenu)

    AddItemToInventory
        if (can add item to inventory)
            AddItem
        else
            AskUser
*/
