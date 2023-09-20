import React, { useState, useCallback, useEffect } from 'react';
import {
    View,
    StyleSheet,
    Text,
    TextInput,
    Dimensions,
    TouchableOpacity,
    Image,
    FlatList,
    ScrollView,
    ActivityIndicator,
    SafeAreaView,
} from 'react-native';
import ProductList from './ProductList';
import { Ionicons } from '@expo/vector-icons';
import SearchedProduct from './SearchedProduct';
import Banner from '../../Shared/Banner';
import CategoryFilter from './CategoryFilter';


var { height } = Dimensions.get('window')
const data = require('../../assets/data/product.json');
const productCategories = require('../../assets/data/categories.json');

const ProductContainer = (props) => {
    const [products, setProducts] = useState([]);
    const [productsFiltered, setProductsFiltered] = useState([]);
    const [focus, setFocus] = useState();
    const [categories, setCategories] = useState([]);
    const [productsCtg, setProductsCtg] = useState([]);
    const [active, setActive] = useState();
    const [initialState, setInitialState] = useState([]);


    useEffect(() => {
        setProducts(data);
        setProductsFiltered(data);
        setFocus(false)
        setCategories(productCategories)
        setActive(-1)
        setProductsCtg(data)
        setInitialState(data)


        return () => {
            setProducts([]);
            setFocus()
            setProductsFiltered([])
            setCategories([])
            setActive()
            setInitialState()

        };
    }, []);

    const searchProduct = (text) => {
        setProductsFiltered(
            products.filter((i) => i.name.toLowerCase().includes(text.toLowerCase()))
        );
    };

    const openList = () => {
        setFocus(true);
    };

    const onBlur = () => {
        setFocus(false);
    };

    // Categories
    const changeCtg = (ctg) => {
        if (ctg === 'All') {
            setProductsCtg(initialState);
            setActive(true);
        } else {
            const filteredProducts = products.filter((item) => item.category._id === ctg);
            setProductsCtg(filteredProducts);
            // const categoryIndex = categories.findIndex((category) => category._id === ctg);
            // setActive(categoryIndex + 1);
        }
    };


    return (
        <ScrollView>
            <View>
                <View style={styles.header}>
                    <Ionicons name="ios-search" size={24} color="black" style={styles.searchIcon} />
                    <TextInput
                        style={styles.input}
                        placeholder="Search"
                        placeholderTextColor="#888"
                        onFocus={openList}
                        onChangeText={(text) => searchProduct(text)}
                    />
                    {focus == true ? (
                        <Ionicons onPress={onBlur} name='ios-close' size={20} />
                    ) : null}

                </View>
                {focus == true ? (
                    <SearchedProduct
                        navigation={props.navigation}
                        productsFiltered={productsFiltered}
                    />
                ) : (
                    <View >
                        <View>
                            <Banner />
                        </View>
                        <View>
                            <CategoryFilter
                                categories={categories}
                                categoryFilter={changeCtg}
                                productsCtg={productsCtg}
                                active={active}
                                setActive={setActive} />
                        </View>
                        {productsCtg.length > 0 ? (
                            <View style={styles.listContainer}>
                                {productsCtg.map((item) => {
                                    return (
                                        <ProductList
                                            navigation={props.navigation}
                                            key={item._id}
                                            item={item}
                                        />
                                    )
                                })}
                            </View>
                        ) : (
                            <View style={styles.center}>
                                <Text>No products found</Text>
                            </View>
                        )}

                    </View>)}
            </View>

        </ScrollView>
    );
};

const styles = StyleSheet.create({
    container: {
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    listContainer: {
        flex: 1,
        height: height,
        flexDirection: 'row',
        alignItems: 'flex-start',
        flexWrap: 'wrap',
        backgroundColor: 'gainsboro',
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: 'gainsboro',
        paddingHorizontal: 16,
        borderRadius: 10,
        borderBottomWidth: 1,
        borderBottomColor: '#ccc',
        margin: 10,
        height: 35
    },
    searchIcon: {
        marginRight: 10,
    },
    input: {
        flex: 1,
        fontSize: 18,
        color: 'black',
    },
    center: {
        backgroundColor: 'gainsboro',
        justifyContent: 'center',
        alignItems: 'center',
        height: height / 2

    }
});

export default ProductContainer;
