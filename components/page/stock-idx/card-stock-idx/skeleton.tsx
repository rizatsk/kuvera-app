import React from 'react';
import { StyleSheet, View } from 'react-native';
import SkeletonPlaceholder from 'react-native-skeleton-placeholder';

export default function SkeletonStockIDX() {
    return (
        <SkeletonPlaceholder>
            <View style={styles.dataTransactionContainer}>
                <View style={{ flexDirection: 'row', alignItems: 'center', gap: 10 }}>
                    {/* Title */}
                    <View>
                        <View style={{ height: 17, width: 80, borderRadius: 4 }} />
                        <View style={{ height: 16, width: 170, borderRadius: 4, marginTop: 4 }} />
                        <View style={{ flexDirection: 'row', gap: 10 }}>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <View style={{ height: 18, width: 18, borderRadius: 4 }} />
                                <View style={{ height: 16, width: 50, borderRadius: 4, marginTop: 4 }} />
                            </View>
                            <View style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                gap: 2,
                            }}>
                                <View style={{ height: 18, width: 18, borderRadius: 4 }} />
                                <View style={{ height: 16, width: 50, borderRadius: 4, marginTop: 4 }} />
                            </View>
                        </View>
                    </View>
                </View>
                {/* Money */}
                <View style={{ alignItems: 'flex-end' }}>
                    <View style={{ height: 18, width: 58, borderRadius: 4 }} />
                    <View style={{ height: 14, width: 80, borderRadius: 4, marginTop: 4 }} />
                </View>
            </View>
        </SkeletonPlaceholder>
    )
}

const styles = StyleSheet.create({
    dataTransactionContainer: {
        backgroundColor: "white",
        paddingVertical: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
    },
});