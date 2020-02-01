// Copy of https://gist.github.com/danieldunderfelt/1982786761cf4156b732b3a128a8050f

import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { Linking } from 'react-native';
import { StyleSheet } from 'react-native';

function openUrl(url) {
  if (url) {
    Linking.openURL(url);
  }
}

const styles = StyleSheet.create({
  root: {},
  view: {},
  codeBlock: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
  },
  codeInline: {
    borderWidth: 1,
    borderColor: '#CCCCCC',
    backgroundColor: '#f5f5f5',
    padding: 10,
    borderRadius: 4,
  },
  del: {
    backgroundColor: '#000000',
  },
  em: {
    fontStyle: 'italic',
  },
  headingContainer: {
    flexDirection: 'row',
  },
  heading: {},
  heading1: {
    fontSize: 32,
  },
  heading2: {
    fontSize: 24,
  },
  heading3: {
    fontSize: 18,
  },
  heading4: {
    fontSize: 16,
  },
  heading5: {
    fontSize: 13,
  },
  heading6: {
    fontSize: 11,
  },
  hr: {
    backgroundColor: '#000000',
    height: 1,
  },
  blockquote: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    margin: 20,
    backgroundColor: '#CCCCCC',
  },
  inlineCode: {
    borderRadius: 3,
    borderWidth: 1,
    fontFamily: 'Courier',
    fontWeight: 'bold',
  },
  list: {},
  listItem: {
    flex: 1,
    flexWrap: 'wrap',
    // backgroundColor: 'green',
  },
  listUnordered: {},

  listUnorderedItem: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
  },

  listUnorderedItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 30,
  },
  listUnorderedItemText: {
    fontSize: 20,
    lineHeight: 20,
  },

  listOrdered: {},
  listOrderedItem: {
    flexDirection: 'row',
  },
  listOrderedItemIcon: {
    marginLeft: 10,
    marginRight: 10,
    lineHeight: 30,
  },
  listOrderedItemText: {
    fontWeight: 'bold',
    lineHeight: 20,
  },
  div: {},
  paragraph: {
    marginTop: 10,
    marginBottom: 10,
    flexWrap: 'wrap',
    flexDirection: 'row',
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  hardbreak: {
    width: '100%',
    height: 1,
  },
  strong: {
    fontWeight: 'bold',
  },
  table: {
    borderWidth: 1,
    borderColor: '#000000',
    borderRadius: 3,
  },
  tableHeader: {},
  tableHeaderCell: {
    flex: 1,
    // color: '#000000',
    padding: 5,
    // backgroundColor: 'green',
  },
  tableRow: {
    borderBottomWidth: 1,
    borderColor: '#000000',
    flexDirection: 'row',
  },
  tableRowCell: {
    flex: 1,
    padding: 5,
  },
  text: {},
  strikethrough: {
    textDecorationLine: 'line-through',
  },
  pre: {},
  link: {},
  image: {
    flex: 1,
    width: 300,
  },
});

const AppMDXComponents = {
  div: ({ children }) => <View style={styles.div}>{children}</View>,
  wrapper: ({ children }) => <View style={styles.div}>{children}</View>,
  textgroup: ({ children }) => {
    return <Text style={styles.text}>{children}</Text>;
  },
  inline: ({ children }) => {
    return <Text>{children}</Text>;
  },
  text: ({ children }) => {
    return <Text>{children}</Text>;
  },
  span: ({ children }) => {
    return <Text>{children}</Text>;
  },
  strong: ({ children }) => {
    return <Text style={styles.strong}>{children}</Text>;
  },
  a: ({ href, children }) => {
    return (
      <Text onPress={() => openUrl(href)} style={styles.link}>
        {children}
      </Text>
    );
  },
  em: ({ children }) => {
    return <Text style={styles.em}>{children}</Text>;
  },
  h1: ({ children }) => {
    return (
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, styles.heading1]}>{children}</Text>
      </View>
    );
  },
  h2: ({ children }) => {
    return (
      <View style={styles.headingContainer}>
        <Text style={[styles.heading, styles.heading2]}>{children}</Text>
      </View>
    );
  },
  h3: ({ children }) => (
    <View style={styles.headingContainer}>
      <Text style={[styles.heading, styles.heading3]}>{children}</Text>
    </View>
  ),
  h4: ({ children }) => (
    <View style={styles.headingContainer}>
      <Text style={[styles.heading, styles.heading4]}>{children}</Text>
    </View>
  ),
  h5: ({ children }) => (
    <View style={styles.headingContainer}>
      <Text style={[styles.heading, styles.heading5]}>{children}</Text>
    </View>
  ),
  h6: ({ children }) => (
    <View style={styles.headingContainer}>
      <Text style={[styles.heading, styles.heading6]}>{children}</Text>
    </View>
  ),
  p: ({ parentName, children }) => (
    <View style={styles.paragraph}>
      <Text>{children}</Text>
    </View>
  ),
  blockquote: ({ children }) => (
    <View style={styles.blockquote}>{children}</View>
  ),
  inlineCode: ({ children }) => {
    return <Text style={styles.codeInline}>{children}</Text>;
  },
  code: ({ children }) => {
    return <Text style={styles.codeBlock}>{children}</Text>;
  },
  pre: ({ children }) => <View style={styles.pre}>{children}</View>,
  ul: ({ children }) => {
    return <View style={[styles.list, styles.listUnordered]}>{children}</View>;
  },
  ol: ({ children }) => {
    return <View style={[styles.list, styles.listOrdered]}>{children}</View>;
  },
  li: ({ children }) => {
    return (
      <View style={styles.listUnorderedItem}>
        <Text style={styles.listUnorderedItemIcon}>{'\u00B7'}</Text>
        <View style={[styles.listItem]}>
          <Text>{children}</Text>
        </View>
      </View>
    );
  },
  table: ({ children }) => <View style={[styles.table]}>{children}</View>,
  thead: ({ children }) => <View style={[styles.tableHeader]}>{children}</View>,
  tbody: ({ children }) => <View>{children}</View>,
  th: ({ children }) => {
    return <View style={[styles.tableHeaderCell]}>{children}</View>;
  },
  tr: ({ children }) => {
    return <View style={[styles.tableRow]}>{children}</View>;
  },
  td: ({ children }) => {
    return <View style={[styles.tableRowCell]}>{children}</View>;
  },
  hr: ({ children }) => {
    return <View style={[styles.hr]} />;
  },
  br: ({ children }) => <Text>{'\n'}</Text>,
  img: ({ src, children }) => {
    return <Image style={styles.image} source={{ uri: src }} />;
  },
};

export default AppMDXComponents;
