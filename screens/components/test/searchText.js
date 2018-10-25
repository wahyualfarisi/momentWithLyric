{!isLoadingSearch && this.state.keyword !== '' && (
    search_list.map( (item,key) => {
        return (
            <View /> 
        )
    })
) }

{search_list.length === 0  && this.state.keyword && (
    <View style={styles.container} >
        <Text>Lyric Not Found</Text>
    </View>
)}