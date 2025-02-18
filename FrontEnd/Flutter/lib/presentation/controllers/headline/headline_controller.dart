import 'package:get/get.dart';
import 'package:event_app/domain/entities/event.dart';
import 'package:event_app/domain/entities/paging.dart';
import 'package:event_app/domain/usecases/fetch_headline_use_case.dart';
import 'package:tuple/tuple.dart';

class HeadlineController extends GetxController {
  HeadlineController(this._fetchHeadlineUseCase);
  final FetchHeadlineUseCase _fetchHeadlineUseCase;
  int _currentPage = 1;
  int _pageSize = 20;
  var _isLoadMore = false;
  var _paging = Rx<Paging?>(null);

  var evenements = RxList<Event>([]);

  fetchData() async {
    final newPaging =
        await _fetchHeadlineUseCase.execute(Tuple2(_currentPage, _pageSize));
    evenements.assignAll(newPaging.events);
    _paging.value = newPaging;
  }

  loadMore() async {
    final totalResults = _paging.value?.totalResults ?? 0;
    if (totalResults / _pageSize <= _currentPage) return;
    if (_isLoadMore) return;
    _isLoadMore = true;
    _currentPage += 1;
    final newPaging =
        await _fetchHeadlineUseCase.execute(Tuple2(_currentPage, _pageSize));
    evenements.addAll(newPaging.events);
    _paging.value?.totalResults = newPaging.totalResults;
    _isLoadMore = false;
  }
}
