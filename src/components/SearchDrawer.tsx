import { useState, useRef, ChangeEvent } from "react"

import {
    Drawer, DrawerBody, DrawerCloseButton, DrawerContent, DrawerHeader, DrawerOverlay,
    IconButton, Input, InputGroup, InputRightAddon,
    useDisclosure
} from "@chakra-ui/react"
import { FiSearch } from "react-icons/fi"

import { DrawerCard } from "./"
import { getProductsWithQuery } from "@/utils"
import { DocumentData } from "firebase/firestore"

const SearchDrawer = () => {
    const [searchText, setSearchText] = useState<string>('')
    const [filteredProducts, setFilteredProducts] = useState<DocumentData>([{}])
    const btnRef = useRef<any>()

    const searchBar = useDisclosure()

    const onSearchPlant = ({ target }: ChangeEvent<HTMLInputElement>): void => {
        const { value } = target;
        setSearchText(value)

        getProductsWithQuery('products', '==', 'title', value).then((log) => {
            console.log(log)
            setFilteredProducts(log)
        })
    };

    return (
        <>
            <IconButton
                aria-label="search"
                variant='ghost'
                ref={btnRef}
                color='white'
                _hover={{ bgColor: 'white', color: 'gray.800' }}
                icon={<FiSearch />}
                onClick={searchBar.onOpen}
            />
            <Drawer
                isOpen={searchBar.isOpen}
                placement='right'
                onClose={searchBar.onClose}
                finalFocusRef={btnRef}
                size='md'
            >
                <DrawerOverlay />
                <DrawerContent>
                    <DrawerCloseButton />
                    <DrawerHeader>Buscar un producto</DrawerHeader>

                    <DrawerBody>
                        <>
                            <InputGroup>
                                <Input mb={8} value={searchText} onChange={onSearchPlant} placeholder='Planta decorativa...' />
                                <InputRightAddon children={<FiSearch />} cursor='pointer' />
                            </InputGroup>
                            {searchText.length >= 2 && filteredProducts.map((filtered: any) => {
                                // console.log(filtered)
                                return (
                                    <DrawerCard
                                        id={filtered.id}
                                        image={filtered.data.image}
                                        description={filtered.data.description}
                                        title={filtered.data.title}
                                        price={filtered.data.price}
                                        key={filtered.id}
                                    />
                                );
                            })
                            }
                        </>
                    </DrawerBody>
                </DrawerContent>
            </Drawer>
        </>
    )
}

export default SearchDrawer