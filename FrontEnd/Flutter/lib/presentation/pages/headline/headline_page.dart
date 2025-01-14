import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:event_app/presentation/controllers/headline/headline_controller.dart';
import 'package:event_app/presentation/pages/detail/detail_page.dart';
import 'package:event_app/presentation/pages/headline/views/event_cell.dart';

class HeadlinePage extends GetView<HeadlineController> {
  final _scrollController = ScrollController();

  @override
  Widget build(BuildContext context) {
    return GetX(
      init: controller,
      initState: (state) {
        controller.fetchData();
      },
      didUpdateWidget: (old, newState) {
        _scrollController.addListener(_scrollListener);
      },
      dispose: (state) {
        _scrollController.removeListener(_scrollListener);
      },
      builder: (_) {
        return CupertinoPageScaffold(
          navigationBar: CupertinoNavigationBar(
            middle: Text('LIST OF EVENTS'),
          ),
          child: ListView.builder(
            controller: _scrollController,
            itemCount: controller.evenements.length,
            itemBuilder: (context, index) {
              final evenement = controller.evenements[index];
              return GestureDetector(
                onTap: () {
                  Get.to(() => DetailPage(event: evenement));
                },
                child: EventCell(evenmt: evenement),
              );
            },
          ),
        );
      },
    );
  }

  void _scrollListener() {
    if (_scrollController.position.extentAfter < 500) {
      print("load more");
      controller.loadMore();
    }
  }
}
