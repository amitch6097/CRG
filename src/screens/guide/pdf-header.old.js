<Header>
  <View style={styles.viewRow}>
    <Button
    transparent
    onPress={this.prePage}
    style={styles.itemFlex1}>
      <Icon name="arrow-back" />
      <Text>Previous</Text>
    </Button>
    <Body
    style={styles.itemFlex1}>
      <Title>
        {this.state.currentPage} / {this.state.totalPages}
      </Title>
    </Body>
    <Button transparent onPress={this.nextPage}
    style={styles.itemFlex1}>
      <Text>Next</Text>
      <Icon name="arrow-forward" />
    </Button>
  </View>
</Header>
