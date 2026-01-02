import java.util.ArrayList;
import java.util.List;

public class leetcode131 {
    public static void main(String[] args) {
       String s = "aab";
        System.out.println( partition(s));


    }


    public static List<List<String>> partition(String s) {
        List<List<String>> ans = new ArrayList<>();
        List<String> temp = new ArrayList<>();
        solve(ans, temp, s, 0);
        return ans;
    }

    public static void solve(List<List<String>> ans, List<String> temp, String s, int idx) {
       int n = s.length();

        if (idx == n) {
            ans.add(new ArrayList<>(temp));
            return;
        }

        for (int i = idx; i < s.length(); i++) {
            if (isPalindrome(s, idx, i)) {
                temp.add(s.substring(idx, i + 1));
                solve(ans, temp, s, i + 1);
                temp.remove(temp.size() - 1);
            }
        }
    }

    private static boolean isPalindrome(String s, int l, int r) {
        while (l < r) {
            if (s.charAt(l++) != s.charAt(r--)) return false;
        }
        return true;
    }
}
